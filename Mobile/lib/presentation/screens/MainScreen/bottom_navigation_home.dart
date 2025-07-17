// BottomHomeScreen.dart

import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:traffic_solution_dsc/presentation/bottom_navigation_view/tabIconData.dart';
import 'package:traffic_solution_dsc/presentation/screens/CameraScreen/CameraScreen.dart';
import 'package:traffic_solution_dsc/presentation/screens/HomeScreen/HomeScreen.dart';
import 'package:traffic_solution_dsc/presentation/screens/NotificationScreen/notification_screen.dart';
import 'package:traffic_solution_dsc/presentation/screens/ProvideImage/provideImageScreen.dart';
import 'package:traffic_solution_dsc/presentation/screens/SettingScreen/SettingScreen.dart';

import '../../../core/constraints/color_palatte.dart';
import '../../bottom_navigation_view/bottom_bar_view.dart';
import 'package:image_picker/image_picker.dart';

class BottomHomeScreen extends StatefulWidget {
  const BottomHomeScreen({super.key});

  @override
  BottomHomeScreenState createState() => BottomHomeScreenState();
}

class BottomHomeScreenState extends State<BottomHomeScreen> {
  List<TabIconData> tabIconsList = TabIconData.tabIconsList;

  // Define the GlobalKey for HomeScreen
  final GlobalKey<HomeScreenState> homeScreenKey = GlobalKey<HomeScreenState>();

  Widget tabBody = Container(
    color: ColorPalette.background,
  );

  @override
  void initState() {
    super.initState();
    tabIconsList.forEach((TabIconData tab) {
      tab.isSelected = false;
    });
    tabIconsList[0].isSelected = true;

    // Initialize HomeScreen with the GlobalKey
    tabBody = HomeScreen(key: homeScreenKey);
  }

  @override
  void dispose() {
    // Dispose any controllers or resources if necessary
    super.dispose();
  }

  void onPickImageSelected() async {
    var imageSource = ImageSource.camera;
    try {
      final ImagePicker _picker = ImagePicker();
      // Pick an image
      final file = await _picker.pickImage(source: imageSource);
      if (file == null) {
        throw Exception('File is not available');
      }

      await Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => ProvideImageScreen(path: file.path),
        ),
      ).whenComplete(() {
        if (mounted) {
          setState(() {
            // Re-initialize HomeScreen with the same GlobalKey
            tabBody = HomeScreen(key: homeScreenKey);
          });
          // Refresh HomeScreen data after returning
          homeScreenKey.currentState?.refreshData();
        }
      });

      // If you get some result back, refresh the screen
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        content: Text(e.toString()),
      ));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      color: ColorPalette.background,
      child: Scaffold(
        backgroundColor: Colors.transparent,
        body: FutureBuilder<bool>(
          future: getData(),
          builder: (BuildContext context, AsyncSnapshot<bool> snapshot) {
            if (!snapshot.hasData) {
              return const SizedBox();
            } else {
              return Stack(
                children: <Widget>[
                  tabBody,
                  bottomBar(),
                ],
              );
            }
          },
        ),
      ),
    );
  }

  Future<bool> getData() async {
    await Future<dynamic>.delayed(const Duration(milliseconds: 200));
    return true;
  }

  Widget bottomBar() {
    return Column(
      children: <Widget>[
        const Expanded(
          child: SizedBox(),
        ),
        BottomBarView(
          tabIconsList: tabIconsList,
          cameraClick: onPickImageSelected,
          changeIndex: (int index) {
            if (index == 0) {
              setState(() {
                // Reuse the same GlobalKey to maintain state
                tabBody = HomeScreen(key: homeScreenKey);
              });
              // Call refreshData when Home tab is selected
              homeScreenKey.currentState?.refreshData();
            } else if (index == 1) {
              setState(() {
                tabBody = CameraScreen();
              });
            } else if (index == 2) {
              setState(() {
                tabBody = NotificationHistoryScreen();
              });
            } else if (index == 3) {
              setState(() {
                tabBody = SettingScreen();
              });
            }
          },
        ),
      ],
    );
  }
}
