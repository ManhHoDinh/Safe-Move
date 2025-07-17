// HomeScreen.dart

import 'dart:async';
import 'dart:math';
import 'dart:typed_data';
import 'dart:ui';
import 'package:custom_map_markers/custom_map_markers.dart';
import 'package:custom_marker/marker_icon.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:geolocator/geolocator.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:intl/intl.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

import 'package:traffic_solution_dsc/core/constraints/status.dart';
import 'package:traffic_solution_dsc/core/helper/AuthFunctions.dart';
import 'package:traffic_solution_dsc/core/helper/assets_helper.dart';
import 'package:traffic_solution_dsc/core/models/camera/camera.dart';
import 'package:traffic_solution_dsc/core/models/flooded_point/flood_point.dart';
import 'package:traffic_solution_dsc/core/models/placeNear/locations.dart';
import 'package:traffic_solution_dsc/core/models/search/map_box_suggest.dart';
import 'package:traffic_solution_dsc/core/networks/firebase_request.dart';
import 'package:traffic_solution_dsc/notification_service.dart';
import 'package:traffic_solution_dsc/presentation/screens/CameraScreen/CameraDetail.dart';
import 'package:traffic_solution_dsc/presentation/screens/Direction/SubScreen/DirectionScreen.dart';
import 'package:traffic_solution_dsc/presentation/screens/Direction/chooseLocation.dart';
import 'package:traffic_solution_dsc/presentation/screens/HomeScreen/cubit/home_cubit.dart';
import 'package:traffic_solution_dsc/presentation/screens/ProvideImage/floodInformationDetailScreen.dart';
import 'package:traffic_solution_dsc/presentation/screens/ReportScreen/reportScreen.dart';
import 'package:traffic_solution_dsc/presentation/screens/searchScreen/cubit/search_cubit.dart';
import 'package:traffic_solution_dsc/presentation/screens/searchScreen/searchSreen.dart';

import 'package:label_marker/label_marker.dart';
import 'package:google_maps_flutter_android/google_maps_flutter_android.dart';
import 'package:google_maps_flutter_platform_interface/google_maps_flutter_platform_interface.dart';

import '../../../core/helper/app_colors.dart';
import '../../../core/helper/send_notification.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);
  static String routeName = "/home";
  static Page page() => const MaterialPage<void>(child: HomeScreen());

  @override
  HomeScreenState createState() => HomeScreenState();

  static MultiBlocProvider provider() {
    return MultiBlocProvider(
      providers: [
        BlocProvider<HomeCubit>(
          create: (BuildContext context) => HomeCubit(),
        ),
      ],
      child: const HomeScreen(),
    );
  }
}

class HomeScreenState extends State<HomeScreen> with WidgetsBindingObserver {
  final Completer<GoogleMapController> _controller =
      Completer<GoogleMapController>();

  static const CameraPosition initCamera = CameraPosition(
    target: LatLng(10.80498476893258, 106.75270736217499),
    zoom: 11,
  );
  LatLng defaultLocation = LatLng(0, 0);
  late BitmapDescriptor enableStoreIcon;
  late BitmapDescriptor selectedStoreIcon;
  late BitmapDescriptor disableStoreIcon;

  Future<void> getIcon() async {
    enableStoreIcon = await createCustomMarkerFromAsset(
        AssetHelper.enableStoreMarkerIcon, // Path to your asset image
        Size(100, 100) // Height of the custom marker
        );
    selectedStoreIcon = await createCustomMarkerFromAsset(
        AssetHelper.selectedStoreMarkerIcon, // Path to your asset image
        Size(100, 100) // Height of the custom marker
        );
    disableStoreIcon = await createCustomMarkerFromAsset(
        AssetHelper.disableStoreMarkerIcon, // Path to your asset image
        Size(100, 100) // Height of the custom marker
        );
  }

  Future<BitmapDescriptor> createCustomMarkerFromAsset(
      String assetName, Size size) async {
    final ByteData byteData = await rootBundle.load(assetName);
    final Uint8List uint8List = byteData.buffer.asUint8List();

    final Codec codec = await instantiateImageCodec(
      uint8List,
      targetHeight: size.height.toInt(),
      targetWidth: size.width.toInt(),
    );
    final FrameInfo frameInfo = await codec.getNextFrame();
    final ByteData? resizedByteData = await frameInfo.image.toByteData(
      format: ImageByteFormat.png,
    );
    final Uint8List resizedUint8List = resizedByteData!.buffer.asUint8List();

    final BitmapDescriptor customIcon =
        BitmapDescriptor.fromBytes(resizedUint8List);
    return customIcon;
  }

  Set<Marker> markers = {};
  Future<void> moveCamera(CameraPosition camera) async {
    try {
      if (!mounted) return;
      final GoogleMapController controller = await _controller.future;
      controller.animateCamera(CameraUpdate.newCameraPosition(camera));
    } catch (e) {
      // Handle the error as needed
      print('Error moving camera: $e');
    }
  }

  bool checkCanRoute() {
    return source != defaultLocation &&
        destination != defaultLocation &&
        source != destination;
  }

  Set<Polyline> _polylines = {};
  LatLng source = LatLng(0, 0);
  LatLng destination = LatLng(0, 0);
  String sourceText = 'Your location';
  String destinationText = "Choose destination";
  Set<Circle> circles = {};
  List<FloodedPoint> floodPoints = [];

  @override
  void initState() {
    super.initState();
    loadFloodedPointData();
    WidgetsFlutterBinding.ensureInitialized();

    WidgetsBinding.instance.endOfFrame.then((value) async {
      await getIcon();
      setState(() {});

      try {
        source = await context
            .read<HomeCubit>()
            .getUserCurrentLocation()
            .whenComplete(() {
          setState(() {});
        });
      } catch (e) {
        print('Error getting user location: $e');
      }

      moveCamera(CameraPosition(target: source, zoom: 11));
      final GoogleMapsFlutterPlatform mapsImplementation =
          GoogleMapsFlutterPlatform.instance;
      if (mapsImplementation is GoogleMapsFlutterAndroid) {
        mapsImplementation.useAndroidViewSurface = true;
        //initializeMapRenderer();
      }
    });
    _loadCameras();
  }

  Future<void> _loadCameras() async {
    List<Camera> cameras = await context.read<HomeCubit>().fetchCameras();
    setState(() {
      markers.addAll(cameras.map((camera) {
        return Marker(
          markerId: MarkerId(camera.id!),
          position: LatLng(camera.location!.coordinates![1],
              camera.location!.coordinates![0]),
          infoWindow: InfoWindow(title: camera.name),
          onTap: () {
            context
                .read<HomeCubit>()
                .getPlaceNear(LatLng(camera.location!.coordinates![1],
                    camera.location!.coordinates![0]))
                .then((value) => {
                      showModalBottomSheet(
                          context: context,
                          builder: (BuildContext context) {
                            if (value.status == StatusType.loaded) {
                              return InkWell(
                                onTap: () {
                                  Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                      builder: (context) => CameraDetailScreen(
                                          cameraData: camera),
                                    ),
                                  );
                                },
                                child: Row(
                                  children: [
                                    Expanded(
                                      child: Container(
                                        height: 180,
                                        width: double.infinity,
                                        padding: EdgeInsets.symmetric(
                                            horizontal: 20),
                                        child: Column(
                                          crossAxisAlignment:
                                              CrossAxisAlignment.start,
                                          children: [
                                            SizedBox(
                                              height: 15,
                                            ),
                                            Text(
                                              toBeginningOfSentenceCase(
                                                      camera.name) ??
                                                  '',
                                              style: TextStyle(
                                                  color: Colors.black,
                                                  fontWeight: FontWeight.bold,
                                                  fontSize: 20),
                                            ),
                                            SizedBox(
                                              height: 15,
                                            ),
                                            Column(
                                              crossAxisAlignment:
                                                  CrossAxisAlignment.start,
                                              children: [
                                                Text(toBeginningOfSentenceCase(
                                                        value
                                                            .locationSelected!
                                                            .results!
                                                            .first
                                                            .name) ??
                                                    ''),
                                                SizedBox(
                                                  height: 10,
                                                ),
                                                Text(toBeginningOfSentenceCase(
                                                        value
                                                            .locationSelected!
                                                            .results!
                                                            .first
                                                            .address) ??
                                                    ''),
                                              ],
                                            )
                                          ],
                                        ),
                                      ),
                                    ),
                                    InkWell(
                                      onTap: () {
                                        destinationText =
                                            toBeginningOfSentenceCase(value
                                                    .locationSelected!
                                                    .results!
                                                    .first
                                                    .name) ??
                                                '';
                                        Location? location = value
                                            .locationSelected!
                                            .results!
                                            .first
                                            .location;
                                        destination = LatLng(location!.lat ?? 0,
                                            location.lng ?? 0);

                                        print(source);
                                        print(destination);

                                        if (checkCanRoute())
                                          Navigator.of(context).push(
                                              MaterialPageRoute(
                                                  builder: (_) =>
                                                      DirectionScreen.providers(
                                                          sourceText,
                                                          source,
                                                          destinationText,
                                                          destination,
                                                          floodPoints)));
                                        else
                                          print("error");
                                      },
                                      child: Container(
                                        padding: EdgeInsets.all(20),
                                        child: Icon(
                                            FontAwesomeIcons.locationArrow),
                                      ),
                                    ),
                                  ],
                                ),
                              );
                            }
                            return Container(
                              height: 150,
                              width: double.infinity,
                            );
                          })
                    });
          },
        );
      }));
    });
  }

// Kiểm tra xem vị trí của người dùng có nằm trong bất kỳ vùng lũ nào không
  bool isUserInFloodZone(LatLng userLocation) {
    for (var circle in circles) {
      double distance = distanceBetweenLatLng(
        userLocation.latitude,
        userLocation.longitude,
        circle.center.latitude,
        circle.center.longitude,
      );
      print('Distance: $distance');
      print('Avoidance distance: $avoidanceDistance');

      // Nếu khoảng cách nhỏ hơn bán kính của vùng lũ, người dùng nằm trong vùng lũ
      if (distance * 1000 <= avoidanceDistance) {
        // radius của Circle là mét, đổi ra km
        print(circle.radius);

        return true;
      }
    }
    return false;
  }

  Timer? locationCheckTimer;
  double notificationDuration = 1.0; // Thời gian hiển thị thông báo (giây)
  double avoidanceDistance = 100.0; // Khoảng cách tránh xa điểm lũ (mét)
  bool isNotificationEnabled = true;

  void _startTimer() {
    print('Start Timer');
    if (mounted) {
      locationCheckTimer = Timer.periodic(
        Duration(minutes: notificationDuration.toInt()),
        (timer) async {
          await _loadSettings();
          Position position = await Geolocator.getCurrentPosition(
            desiredAccuracy: LocationAccuracy.high,
          );
          LatLng userLocation = LatLng(position.latitude, position.longitude);
          print('User location: $userLocation');
          if (isUserInFloodZone(userLocation)) {
            // Gửi thông báo cho người dùng
            if (isNotificationEnabled) {
              NotificationService.showNotification(
                'Cảnh báo lũ lụt',
                'Bạn đang ở trong bán kính ${avoidanceDistance}m vùng lũ lụt',
              );
              await sendNotification(
                userId: AuthServices.CurrentUser!.Id,
                title: 'Cảnh báo lũ lụt',
                message:
                    'Bạn đang ở trong bán kính ${avoidanceDistance}m vùng lũ lụt',
              );
            }
            print(isNotificationEnabled);
          }
        },
      );
    }
  }

  void _cancelTimer() {
    if (locationCheckTimer != null) {
      locationCheckTimer!.cancel();
      locationCheckTimer = null;
    }
  }

  Future<void> _loadSettings() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    notificationDuration = prefs.getDouble('notificationDuration') ?? 1.0;
    avoidanceDistance = prefs.getDouble('avoidanceDistance') ?? 100.0;
    isNotificationEnabled = prefs.getBool('isNotificationEnabled') ?? true;
  }

  Future<void> loadFloodedPointData() async {
    floodPoints = await context.read<HomeCubit>().fetchFloodedPoints();
    _addFloodCircles(floodPoints);
    await _loadSettings();

    _startTimer();
  }

  void _addFloodCircles(List<FloodedPoint> floodPoints) {
    setState(() {
      circles.clear(); // Clear existing circles to avoid duplicates
      circles.addAll(floodPoints.map((floodPoint) {
        return Circle(
          consumeTapEvents: true,
          onTap: () {
            context
                .read<HomeCubit>()
                .getPlaceNear(
                    LatLng(floodPoint.latitude ?? 0, floodPoint.longitude ?? 0))
                .then((value) => {
                      showModalBottomSheet(
                          context: context,
                          builder: (BuildContext context) {
                            if (value.status == StatusType.loaded) {
                              return InkWell(
                                onTap: () {
                                  Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                      builder: (context) =>
                                          FloodInformationDetailScreen(
                                        floodInformationId:
                                            floodPoint.flood_information_id,
                                      ),
                                    ),
                                  );
                                },
                                child: Row(
                                  children: [
                                    Expanded(
                                      child: Container(
                                        height: 180,
                                        width: double.infinity,
                                        padding: EdgeInsets.symmetric(
                                            horizontal: 20),
                                        child: Column(
                                          crossAxisAlignment:
                                              CrossAxisAlignment.start,
                                          children: [
                                            SizedBox(
                                              height: 15,
                                            ),
                                            // Optional: Add flood point name if available
                                            // Text(
                                            //   toBeginningOfSentenceCase(floodPoint.name) ?? '',
                                            //   style: TextStyle(
                                            //       color: Colors.black,
                                            //       fontWeight: FontWeight.bold,
                                            //       fontSize: 20),
                                            // ),
                                            // SizedBox(
                                            //   height: 15,
                                            // ),
                                            Column(
                                              crossAxisAlignment:
                                                  CrossAxisAlignment.start,
                                              children: [
                                                Text(toBeginningOfSentenceCase(
                                                        value
                                                            .locationSelected!
                                                            .results!
                                                            .first
                                                            .name) ??
                                                    ''),
                                                SizedBox(
                                                  height: 10,
                                                ),
                                                Text(toBeginningOfSentenceCase(
                                                        value
                                                            .locationSelected!
                                                            .results!
                                                            .first
                                                            .address) ??
                                                    ''),
                                              ],
                                            )
                                          ],
                                        ),
                                      ),
                                    ),
                                    InkWell(
                                      onTap: () {
                                        destinationText =
                                            toBeginningOfSentenceCase(value
                                                    .locationSelected!
                                                    .results!
                                                    .first
                                                    .name) ??
                                                '';
                                        Location? location = value
                                            .locationSelected!
                                            .results!
                                            .first
                                            .location;
                                        destination = LatLng(location!.lat ?? 0,
                                            location.lng ?? 0);

                                        print(source);
                                        print(destination);

                                        if (checkCanRoute())
                                          Navigator.of(context).push(
                                              MaterialPageRoute(
                                                  builder: (_) =>
                                                      DirectionScreen.providers(
                                                          sourceText,
                                                          source,
                                                          destinationText,
                                                          destination,
                                                          floodPoints)));
                                        else
                                          print("error");
                                      },
                                      child: Container(
                                        padding: EdgeInsets.all(20),
                                        child: Icon(
                                            FontAwesomeIcons.locationArrow),
                                      ),
                                    ),
                                  ],
                                ),
                              );
                            }
                            return Container(
                              height: 150,
                              width: double.infinity,
                            );
                          })
                    });
          },
          circleId: CircleId(floodPoint.id.toString()),
          center: LatLng(
            floodPoint.latitude ?? 0,
            floodPoint.longitude ?? 0,
          ),
          radius: 500,
          fillColor: AppColors.getFloodLevelColor(floodPoint.floodLevel ?? 1)
              .withOpacity(0.5), // Optional: Adjust opacity
          strokeColor: AppColors.getFloodLevelColor(floodPoint.floodLevel ?? 1),
          strokeWidth: 2,
        );
      }));
    });
  }

  @override
  void dispose() {
    locationCheckTimer?.cancel(); // Hủy Timer khi widget bị hủy
    locationCheckTimer = null;
    super.dispose();
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    super.didChangeAppLifecycleState(state);

    print(state);
    print("Change here");
    if (state == AppLifecycleState.paused) {
      print('Home paused');

      _cancelTimer();
    } else if (state == AppLifecycleState.resumed) {
      print('Home resumed');
      loadFloodedPointData();
    }
  }

  // Method to refresh data
  void refreshData() {
    loadFloodedPointData();
  }

  @override
  Widget build(BuildContext context) {
    // Make sure to initialize before map loading
    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            InkWell(
              child: Container(
                decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.all(Radius.circular(20))),
                padding: EdgeInsets.symmetric(horizontal: 20, vertical: 15),
                margin: EdgeInsets.symmetric(vertical: 10, horizontal: 20),
                width: double.infinity,
                child: Text(
                  'Search here',
                  style: TextStyle(color: Colors.grey, fontSize: 20),
                ),
              ),
              onTap: () async {
                var result = await Navigator.of(context).push(MaterialPageRoute(
                    builder: (_) => BlocProvider(
                          create: (context) => SearchCubit(),
                          child: SearchScreen(),
                        )));
                try {
                  if (result != null) {
                    Suggestion location = result;
                    if (location.latLng != null) {
                      setState(() {
                        markers.add(Marker(
                          icon: BitmapDescriptor.defaultMarkerWithHue(
                              BitmapDescriptor.hueYellow),
                          markerId: MarkerId(location.mapboxId!),
                          position: location.latLng!,
                          infoWindow: InfoWindow(
                              title: location.name, snippet: location.address),
                        ));
                        print(markers);
                        moveCamera(
                            CameraPosition(target: location.latLng!, zoom: 13));
                      });
                    }
                  }
                } catch (e) {
                  print(e.toString());
                }
              },
            ),
            Expanded(
              child: GoogleMap(
                  mapType: MapType.normal,
                  initialCameraPosition: initCamera,
                  markers: markers,
                  onMapCreated: (GoogleMapController controller) {
                    if (!_controller.isCompleted) {
                      // First call, complete the controller
                      _controller.complete(controller);
                    } else {
                      // Subsequent calls, do nothing
                    }
                  },
                  trafficEnabled: true,
                  zoomControlsEnabled: true,
                  myLocationEnabled: true,
                  myLocationButtonEnabled: true,
                  circles: circles,
                  polylines: _polylines),
            )
          ],
        ),
      ),
      floatingActionButton: Padding(
        padding: const EdgeInsets.only(bottom: 50.0), // 60px from bottom
        child: FloatingActionButton(
          onPressed: () {
            print("hihi");
            Navigator.of(context).push(MaterialPageRoute(
              builder: (_) => ChooseLocation(
                floodedPoints: floodPoints,
              ),
            ));
          },
          child: Icon(Icons.directions),
        ),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.endFloat,
    );
  }

  double calculateZoomLevel(List<LatLng> boundingBox) {
    // Tính toán độ rộng của khu vực theo kinh tuyến
    double width = boundingBox[1].longitude - boundingBox[0].longitude;

    // Tính toán độ cao của khu vực theo vĩ tuyến
    double height = boundingBox[1].latitude - boundingBox[0].latitude;

    // Tính toán tỉ lệ zoom dựa trên độ rộng và độ cao của khu vực
    double zoomLevel = height * width;
    print(zoomLevel);
    zoomLevel = min(max(zoomLevel, 1), 21);

    // Giới hạn tỉ lệ zoom ở mức thấp nhất là 10
    zoomLevel = max(zoomLevel, 10);

    // Nếu diện tích nhỏ, thì zoomLevel phải lớn
    if (height / width < 0.001) {
      zoomLevel = 15;
    }
    // Trả về tỉ lệ zoom
    return 15;
  }

  double degreesToRadians(double degrees) {
    return degrees * (pi / 180.0);
  }

  double distanceBetweenLatLng(
      double lat1, double lng1, double lat2, double lng2) {
    const double earthRadius = 6371; // Earth's radius in kilometers

    double dLat = degreesToRadians(lat2 - lat1);
    double dLng = degreesToRadians(lng2 - lng1);

    double a = sin(dLat / 2) * sin(dLat / 2) +
        cos(degreesToRadians(lat1)) *
            cos(degreesToRadians(lat2)) *
            sin(dLng / 2) *
            sin(dLng / 2);

    double c = 2 * atan2(sqrt(a), sqrt(1 - a));

    double distance = earthRadius * c;

    return distance;
  }

  String? checkAllStreetSegment(LatLng position) {
    String? results;
    _polylines.forEach((element) {
      if (checkStreetSegmentNear(
          element.points[0], element.points[1], position)) {
        results = element.polylineId.value;
        return;
      }
    });
    return results;
  }

  bool checkStreetSegmentNear(LatLng A, LatLng B, LatLng C) {
    double radius = distanceBetweenLatLng(
            A.latitude, A.longitude, B.latitude, B.longitude) /
        2;
    double distanceToCenter = distanceBetweenLatLng(C.latitude, C.longitude,
        (A.latitude + B.latitude) / 2, (A.longitude + B.longitude) / 2);
    if (distanceToCenter <= radius) {
      // Điểm C nằm trong vùng bán kính của đường tròn
      return true;
    } else {
      // Điểm C nằm ngoài vùng bán kính của đường tròn
      return false;
    }
  }
}
