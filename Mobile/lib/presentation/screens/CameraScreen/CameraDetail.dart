import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:intl/intl.dart';
import 'package:traffic_solution_dsc/core/helper/AuthFunctions.dart';
import 'package:traffic_solution_dsc/core/helper/app_colors.dart';
import 'package:traffic_solution_dsc/core/models/camera/camera.dart';
import 'dart:convert' as convert;
import 'package:http/http.dart' as http;
import '../../../core/constraints/color_palatte.dart';
import '../../../core/constraints/dimension_constants.dart';
import '../../../core/helper/text_styles.dart';
import '../../../core/models/placeNear/placeNear.dart';
import '../../widgets/button_widget.dart';
import 'package:share_plus/share_plus.dart';
import 'package:path_provider/path_provider.dart';

class CameraDetailScreen extends StatefulWidget {
  final Camera cameraData;

  CameraDetailScreen({required this.cameraData});

  @override
  _CameraDetailScreenState createState() => _CameraDetailScreenState();
}

class _CameraDetailScreenState extends State<CameraDetailScreen> {
  late Timer _timer;
  String _imageUrl = '';
  String _placeNear = 'Loading ...';
  bool isFollowing = false;
  String? status;
  String? time;
  @override
  void initState() {
    super.initState();
    getPlaceNear(LatLng(widget.cameraData.location!.coordinates![1],
            widget.cameraData.location!.coordinates![0]))
        .then((value) {
      _placeNear = value.results![0].address!;
    });
    _imageUrl = '${widget.cameraData.liveviewUrl}';
    _startImageFetcher();

    fetchDetections(widget.cameraData.id!);
    checkFollowedCameraId().then((value) {
      setState(() {
        isFollowing = value;
      });
    });
  }

  void _startImageFetcher() {
    _timer = Timer.periodic(Duration(seconds: 12), (timer) async {
      setState(() {
        _imageUrl =
            '${widget.cameraData.liveviewUrl}?t=${DateTime.now().millisecondsSinceEpoch}';
      });
      await fetchDetections(widget.cameraData.id!);
    });
  }

  Future<void> fetchDetections(String cameraId) async {
    // Define the API endpoint
    final String url =
        'https://detect-information-service.onrender.com/detections/camera/$cameraId';

    try {
      // Make the GET request
      final response = await http.get(
        Uri.parse(url),
        headers: {
          'accept': 'application/json', // Add headers if needed
        },
      );

      // Check the status code
      if (response.statusCode == 200) {
        // Parse the response body
        final data = jsonDecode(response.body);
        print('API Response: $data');
        setState(() {
          status = data[0]['result'] ?? 'Loading...';

          time = DateFormat('dd/MM/yyyy HH:mm')
              .format(DateTime.parse(data[0]['timestamp']))
              .toString();
        });
      } else {
        print('Failed to fetch data. Status code: ${response.statusCode}');
      }
    } catch (e) {
      print('Error occurred: $e');
    }
  }

  Future<PlaceNear> getPlaceNear(LatLng latLng) async {
    try {
      final headers = {
        'X-RapidAPI-Host': 'trueway-places.p.rapidapi.com',
        'X-RapidAPI-Key': 'b1a1bfce34msh0287fa31caec574p100443jsnd9d5e7fc04c2',
      };

      final params = {
        'location': '${latLng.latitude},${latLng.longitude}',
        'language': 'vi',
      };

      final url =
          Uri.parse('https://trueway-places.p.rapidapi.com/FindPlacesNearby')
              .replace(queryParameters: params);

      final res = await http.get(url, headers: headers);
      final status = res.statusCode;
      if (status != 200) throw Exception('http.get error: statusCode= $status');
      return PlaceNear.fromJson(convert.jsonDecode(res.body));
    } catch (e) {
      throw Exception('getPlaceNear error: $e');
    }
  }

  Future<void> followCamera({
    required String cameraId,
    required String userId,
    required String userEmail,
  }) async {
    // Define the URL
    final url = Uri.parse('https://camera-service.onrender.com/cameras/follow');

    // Create the headers
    final headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    // Create the JSON body
    final Map<String, dynamic> body = {
      'cameraId': cameraId,
      'userId': userId,
      'userEmail': userEmail,
    };

    try {
      // Send the POST request
      final response = await http.post(
        url,
        headers: headers,
        body: jsonEncode(body),
      );

      // Check the response status
      if (response.statusCode == 200 || response.statusCode == 201) {
        // Success
        print('Successfully followed the camera.');
        print('Response Body: ${response.body}');
      } else {
        // Server returned an error
        print('Failed to follow the camera.');
        print('Status Code: ${response.statusCode}');
        print('Response Body: ${response.body}');
      }
    } catch (e) {
      // An exception occurred (e.g., network error)
      print('An error occurred: $e');
    }
  }

  Future<bool> checkFollowedCameraId() async {
    final url = Uri.parse(
        'https://camera-service.onrender.com/follow/{user_id}?userId=${AuthServices.CurrentUser!.Id}');

    try {
      final response = await http.get(
        url,
        headers: {
          'Accept': 'application/json',
        },
      );

      if (response.statusCode == 200) {
        List<dynamic> data = json.decode(response.body);
        List<String> cameraIds = data.map((id) => id.toString()).toList();
        return cameraIds.contains(widget.cameraData.id);
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }

  Future<void> unfollowCamera({
    required String cameraId,
    required String userId,
  }) async {
    // Define the base URL
    final String baseUrl = 'https://camera-service.onrender.com/cameras/follow';

    // Create the URI with query parameters
    final uri = Uri.parse(baseUrl).replace(queryParameters: {
      'cameraId': cameraId,
      'userId': userId,
    });

    // Create the headers
    final headers = {
      'Accept': 'application/json',
    };

    try {
      // Send the DELETE request
      final response = await http.delete(
        uri,
        headers: headers,
      );

      // Check the response status
      if (response.statusCode == 200 || response.statusCode == 204) {
        // Success (204 No Content is also common for DELETE)
        print('Successfully unfollowed the camera.');
        if (response.body.isNotEmpty) {
          print('Response Body: ${response.body}');
        }
      } else {
        // Server returned an error
        print('Failed to unfollow the camera.');
        print('Status Code: ${response.statusCode}');
        print('Response Body: ${response.body}');
      }
    } catch (e) {
      // An exception occurred (e.g., network error)
      print('An error occurred: $e');
    }
  }

  @override
  void dispose() {
    _timer.cancel();
    super.dispose();
  }

  Future<void> _shareImage() async {
    try {
      final imageUrl = _imageUrl;

      // Lấy ảnh từ URL và lưu vào Clipboard
      final ByteData bytes =
          await NetworkAssetBundle(Uri.parse(imageUrl)).load("");
      final Uint8List list = bytes.buffer.asUint8List();

      final tempDir = await getTemporaryDirectory();
      final file = await File('${tempDir.path}/image.png').create();
      await file.writeAsBytes(list);

      // Sử dụng share_plus để chia sẻ file
      await Share.shareFiles([file.path], text: 'Check out this camera image!');
    } catch (e) {
      print('Error sharing image: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.cameraData.name ?? 'Camera Detail'),
      ),
      body: SingleChildScrollView(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  Container(
                      width: 100,
                      alignment: Alignment.topRight,
                      child: InkWell(
                        borderRadius: kDefaultBorderRadius,
                        onTap: () async {
                          if (!isFollowing) {
                            await followCamera(
                              cameraId: widget.cameraData.id!,
                              userId: AuthServices.CurrentUser!.Id,
                              userEmail: AuthServices.CurrentUser!.Email,
                            );

                            setState(() {
                              isFollowing = true;
                            });
                          } else {
                            await unfollowCamera(
                              cameraId: widget.cameraData.id!,
                              userId: AuthServices.CurrentUser!.Id,
                            );
                            setState(() {
                              isFollowing = false;
                            });
                          }
                        },
                        splashColor: Colors.amber,
                        child: Container(
                          alignment: Alignment.center,
                          width: double.infinity,
                          decoration: BoxDecoration(
                              borderRadius: kDefaultBorderRadius,
                              color: ColorPalette.primaryColor),
                          padding: const EdgeInsets.symmetric(vertical: 13),
                          child: Text(
                            isFollowing ? 'Unfollow' : 'Follow',
                            style: TextStyles.h6
                                .copyWith(color: ColorPalette.white),
                          ),
                        ),
                      )),
                ],
              ),
              // Camera Details
              SizedBox(height: 20),
              Text('The image from the camera is updated every 12 seconds',
                  style: TextStyle(fontSize: 14, color: Colors.black87)),
              SizedBox(height: 12),

              // Live View Image
              Center(
                child: Image.network(
                  _imageUrl,
                  loadingBuilder: (BuildContext context, Widget child,
                      ImageChunkEvent? loadingProgress) {
                    if (loadingProgress == null) {
                      return child;
                    } else {
                      return Center(
                        child: CircularProgressIndicator(
                          value: loadingProgress.expectedTotalBytes != null
                              ? loadingProgress.cumulativeBytesLoaded /
                                  (loadingProgress.expectedTotalBytes ?? 1)
                              : null,
                        ),
                      );
                    }
                  },
                  errorBuilder: (context, error, stackTrace) {
                    return Text('Failed to load live view');
                  },
                ),
              ),
              SizedBox(height: 15),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Camera detail',
                    style: TextStyle(
                        fontSize: 18,
                        color: ColorPalette.primaryColor,
                        fontWeight: FontWeight.bold),
                  ),
                  IconButton(
                    icon: Icon(
                      Icons.ios_share_rounded,
                      color: ColorPalette.primaryColor,
                    ),
                    onPressed: () {
                      _shareImage();
                    },
                  ),
                ],
              ),
              SizedBox(height: 12),
              Row(
                crossAxisAlignment:
                    CrossAxisAlignment.start, // Align vertically at the top
                children: [
                  Expanded(
                    flex: 3,
                    child: Text(
                      'Name: ',
                      style: TextStyle(
                        fontSize: 16,
                        color: Colors.black,
                      ),
                    ),
                  ),
                  Expanded(
                    flex: 5,
                    child: Text(
                      '${widget.cameraData.name ?? 'Loading...'}',
                      style: TextStyle(
                        fontSize: 16,
                        color: Colors.black,
                      ),
                      softWrap: true, // Allows text to wrap
                    ),
                  ),
                ],
              ),
              SizedBox(height: 12), // Space between rows

              Row(
                crossAxisAlignment:
                    CrossAxisAlignment.start, // Align vertically at the top
                children: [
                  Expanded(
                    flex: 3,
                    child: Text(
                      'Location: ',
                      style: TextStyle(
                        fontSize: 16,
                        color: Colors.black,
                      ),
                    ),
                  ),
                  Expanded(
                    flex: 5,
                    child: Text(
                      '${_placeNear ?? 'Loading...'}',
                      style: TextStyle(
                        fontSize: 16,
                        color: Colors.black,
                      ),
                      softWrap: true, // Allows text to wrap
                    ),
                  ),
                ],
              ),

              SizedBox(height: 12),
              Row(
                crossAxisAlignment:
                    CrossAxisAlignment.start, // Align vertically at the top
                children: [
                  Expanded(
                    flex: 3,
                    child: Text(
                      'Position: ',
                      style: TextStyle(
                        fontSize: 16,
                        color: Colors.black,
                      ),
                    ),
                  ),
                  Expanded(
                    flex: 5,
                    child: Text(
                      '${widget.cameraData.location!.coordinates![0] ?? 'Loading...'},\n${widget.cameraData.location!.coordinates![1] ?? 'Loading...'}',
                      style: TextStyle(
                        fontSize: 16,
                        color: Colors.black,
                      ),
                      softWrap: true, // Allows text to wrap
                    ),
                  ),
                ],
              ),
              SizedBox(height: 12),
              Row(
                crossAxisAlignment:
                    CrossAxisAlignment.start, // Align vertically at the top
                children: [
                  Expanded(
                    flex: 3,
                    child: Text(
                      'Status: ',
                      style: TextStyle(
                        fontSize: 16,
                        color: Colors.black,
                      ),
                    ),
                  ),
                  Expanded(
                    flex: 5,
                    child: Text(
                      '${status ?? 'Loading...'}',
                      style: TextStyle(
                        fontSize: 16,
                        color: Colors.black,
                      ),
                      softWrap: true, // Allows text to wrap
                    ),
                  ),
                ],
              ),
              SizedBox(height: 12),
              Row(
                crossAxisAlignment:
                    CrossAxisAlignment.start, // Align vertically at the top
                children: [
                  Expanded(
                    flex: 3,
                    child: Text(
                      'Detect time: ',
                      style: TextStyle(
                        fontSize: 16,
                        color: Colors.black,
                      ),
                    ),
                  ),
                  Expanded(
                    flex: 5,
                    child: Text(
                      '${time ?? 'Loading...'}',
                      style: TextStyle(
                        fontSize: 16,
                        color: Colors.black,
                      ),
                      softWrap: true, // Allows text to wrap
                    ),
                  ),
                ],
              ),
            ],
          )),
    );
  }
}
