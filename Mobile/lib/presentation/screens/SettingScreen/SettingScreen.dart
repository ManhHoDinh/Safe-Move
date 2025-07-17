import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:traffic_solution_dsc/presentation/screens/AppInfoScreen/AppInfoScreen.dart';
import 'package:traffic_solution_dsc/presentation/screens/PersonalInformationScreen/PersonalInformationScreen.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../../core/helper/AuthFunctions.dart';

class SettingScreen extends StatefulWidget {
  const SettingScreen({super.key});

  @override
  State<SettingScreen> createState() => _SettingScreenState();
}

class _SettingScreenState extends State<SettingScreen> {
  // Hàm tải các thiết lập từ SharedPreferences
  double notificationDuration = 5.0; // Thời gian hiển thị thông báo (giây)
  double avoidanceDistance = 100.0; // Khoảng cách tránh xa điểm lũ (mét)
  bool isNotificationEnabled = true; // Trạng thái bật/tắt thông báo
  Future<void> _loadSettings() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    setState(() {
      notificationDuration = prefs.getDouble('notificationDuration') ?? 5.0;
      avoidanceDistance = prefs.getDouble('avoidanceDistance') ?? 100.0;
      isNotificationEnabled = prefs.getBool('isNotificationEnabled') ?? true;
    });
  }

  @override
  void initState() {
    super.initState();
    _loadSettings();
  }

  // Hàm lưu các thiết lập vào SharedPreferences
  Future<void> _saveSettings() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    await prefs.setDouble('notificationDuration', notificationDuration);
    await prefs.setDouble('avoidanceDistance', avoidanceDistance);
    await prefs.setBool('isNotificationEnabled', isNotificationEnabled);
  }

  void _showCustomSettingsDialog() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        double tempNotificationDuration = notificationDuration;
        double tempAvoidanceDistance = avoidanceDistance;
        bool tempNotificationEnabled =
            isNotificationEnabled; // Temp variable for the switch state

        return StatefulBuilder(
          builder: (BuildContext context, StateSetter setState) {
            return AlertDialog(
              title: Text('Customize Settings'),
              content: SingleChildScrollView(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    // Switch for enabling/disabling notifications
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text('Enable Notifications:'),
                        Switch(
                          value: tempNotificationEnabled,
                          onChanged: (bool value) {
                            setState(() {
                              tempNotificationEnabled = value;
                            });
                          },
                        ),
                      ],
                    ),
                    SizedBox(height: 20),
                    // Notification interval slider
                    Text('Notification display interval (minutes):'),
                    Row(
                      children: [
                        Slider(
                          value: tempNotificationDuration,
                          min: 1,
                          max: 30,
                          divisions: 30,
                          label: tempNotificationDuration.toInt().toString(),
                          onChanged: tempNotificationEnabled
                              ? (double value) {
                                  setState(() {
                                    tempNotificationDuration = value;
                                  });
                                }
                              : null, // Disable slider if notifications are off
                        ),
                        Text(
                          tempNotificationDuration.toInt().toString(),
                        ),
                      ],
                    ),
                    SizedBox(height: 20),
                    // Distance slider
                    Text('Distance from flood point (meters):'),
                    Row(
                      children: [
                        Slider(
                          value: tempAvoidanceDistance,
                          min: 50,
                          max: 500,
                          divisions: 45,
                          label: tempAvoidanceDistance.toInt().toString(),
                          onChanged: tempNotificationEnabled
                              ? (double value) {
                                  setState(() {
                                    tempAvoidanceDistance = value;
                                  });
                                }
                              : null,
                        ),
                        Text(tempAvoidanceDistance.toInt().toString()),
                      ],
                    ),
                  ],
                ),
              ),
              actions: [
                TextButton(
                  child: Text('Cancel'),
                  onPressed: () {
                    Navigator.of(context).pop();
                  },
                ),
                ElevatedButton(
                  child: Text('Save'),
                  onPressed: () {
                    setState(() {
                      isNotificationEnabled = tempNotificationEnabled;
                      notificationDuration = tempNotificationDuration;
                      avoidanceDistance = tempAvoidanceDistance;
                    });
                    _saveSettings();
                    Navigator.of(context).pop();
                  },
                ),
              ],
            );
          },
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    int retryAttempt = 5;
    final currentUser = FirebaseAuth.instance.currentUser;

    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            // Profile Section
            Container(
              color: Colors.white,
              width: double.infinity,
              alignment: Alignment.center,
              padding: const EdgeInsets.all(16.0),
              child: Column(
                children: <Widget>[
                  ClipRRect(
                    borderRadius: BorderRadius.circular(
                        60.0), // Half of 120 for a perfect circle
                    child: currentUser != null && currentUser.photoURL != null
                        ? Image.network(
                            currentUser.photoURL!,
                            height: 120,
                            width: 120,
                            fit: BoxFit.cover,
                            errorBuilder: (context, error, stackTrace) {
                              if (retryAttempt > 0) {
                                retryAttempt--;
                                WidgetsBinding.instance
                                    .addPostFrameCallback((_) {
                                  setState(() {});
                                });
                              }
                              return InkWell(
                                onTap: () {
                                  setState(() {});
                                },
                                child: const Icon(
                                  Icons.error,
                                  size: 60,
                                  color: Colors.red,
                                ),
                              );
                            },
                            loadingBuilder: (BuildContext context, Widget child,
                                ImageChunkEvent? loadingProgress) {
                              if (loadingProgress == null) return child;
                              return Center(
                                child: CircularProgressIndicator(
                                  value: loadingProgress.expectedTotalBytes !=
                                          null
                                      ? loadingProgress.cumulativeBytesLoaded /
                                          loadingProgress.expectedTotalBytes!
                                      : null,
                                ),
                              );
                            },
                          )
                        : Image.asset(
                            'assets/images/userImage.png',
                            height: 120,
                            width: 120,
                            fit: BoxFit.cover,
                          ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    FirebaseAuth.instance.currentUser!.photoURL != null
                        ? FirebaseAuth.instance.currentUser!.displayName!
                        : 'Manh Ho Dinh',
                    style: TextStyle(
                      fontWeight: FontWeight.w600,
                      color: Colors.black,
                      fontSize: 18,
                    ),
                  ),
                ],
              ),
            ),
            // Settings List
            Expanded(
              child: ListView(
                children: [
                  ListTile(
                    leading: Icon(Icons.person),
                    title: Text('Personal Information'),
                    trailing: Icon(
                      Icons.arrow_forward_ios,
                      size: 20,
                    ),
                    onTap: () {
                      // Navigate to Personal Information Screen
                      Navigator.push(context,
                          MaterialPageRoute(builder: (_) => ProfileScreen()));
                    },
                  ),
                  Divider(),
                  ListTile(
                    leading: Icon(Icons.info),
                    title: Text('App Information'),
                    trailing: Icon(
                      Icons.arrow_forward_ios,
                      size: 20,
                    ),
                    onTap: () {
                      Navigator.push(context,
                          MaterialPageRoute(builder: (_) => AppInfoScreen()));
                    },
                  ),
                  Divider(),
                  ListTile(
                    leading: Icon(Icons.feedback),
                    title: Text('App Feedback'),
                    trailing: Icon(
                      Icons.arrow_forward_ios,
                      size: 20,
                    ),
                    onTap: _sendEmail,
                  ),
                  Divider(),
                  ListTile(
                    leading: Icon(Icons.settings),
                    title: Text('Customize Settings'),
                    trailing: Icon(
                      Icons.arrow_forward_ios,
                      size: 20,
                    ),
                    onTap: _showCustomSettingsDialog,
                  ),
                  Divider(),
                  ListTile(
                    leading: Icon(Icons.logout),
                    title: Text('Log Out'),
                    trailing: Icon(
                      Icons.arrow_forward_ios,
                      size: 20,
                    ),
                    onTap: () async {
                      // Navigate to Customize Settings Screen
                      await FirebaseAuth.instance.signOut();
                      await GoogleSignIn().signOut();
                    },
                  ),

                  // Padding(
                  //   padding: const EdgeInsets.symmetric(
                  //       horizontal: 16.0, vertical: 8.0),
                  //   child: ElevatedButton.icon(
                  //     icon: Icon(Icons.logout),
                  //     label: Text('Log Out'),
                  //     onPressed: () async {
                  //       await FirebaseAuth.instance.signOut();
                  //       // Navigate to login screen or perform other actions after logout
                  //     },
                  //     style: ElevatedButton.styleFrom(
                  //       primary: Colors.red, // Button color
                  //       onPrimary: Colors.white, // Text and icon color
                  //       minimumSize:
                  //           Size(double.infinity, 50), // Make button full-width
                  //     ),
                  //   ),
                  // ),

                  // Add more settings options here if needed
                ],
              ),
            ),
            // Log Out Button
            SizedBox(height: 20), // Adjust spacing as needed
          ],
        ),
      ),
    );
  }

  void _sendEmail() async {
    final Uri emailLaunchUri = Uri(
      scheme: 'mailto',
      path: '21522327@gm.uit.edu.vn',
      query: encodeQueryParameters(<String, String>{
        'subject': 'Can you help me resolve some problems in my app?',
        'body': 'Hi,\nI am having trouble with the app. Can you help me?'
      }),
    );
    await launchUrl(emailLaunchUri);
  }

  String? encodeQueryParameters(Map<String, String> params) {
    return params.entries
        .map((MapEntry<String, String> e) =>
            '${Uri.encodeComponent(e.key)}=${Uri.encodeComponent(e.value)}')
        .join('&');
  }
}
