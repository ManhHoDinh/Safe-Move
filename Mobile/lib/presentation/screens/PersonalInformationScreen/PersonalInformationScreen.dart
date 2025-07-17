// profile_screen.dart
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:traffic_solution_dsc/core/helper/AuthFunctions.dart';

class ProfileScreen extends StatefulWidget {
  @override
  _ProfileScreenState createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  final currentUser = FirebaseAuth.instance.currentUser;
  int retryAttempt = 5;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Thông Tin Cá Nhân'),
        centerTitle: true,
        backgroundColor: Colors.blueAccent,
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            // Hình Ảnh Đại Diện
            Center(
              child: ClipRRect(
                borderRadius: BorderRadius.circular(
                    60.0), // Half of 120 for a perfect circle
                child: currentUser != null && currentUser?.photoURL != null
                    ? Image.network(
                        currentUser!.photoURL!,
                        height: 120,
                        width: 120,
                        fit: BoxFit.cover,
                        errorBuilder: (context, error, stackTrace) {
                          if (retryAttempt > 0) {
                            retryAttempt--;
                            WidgetsBinding.instance.addPostFrameCallback((_) {
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
                              value: loadingProgress.expectedTotalBytes != null
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
            ),
            SizedBox(height: 20),
            // Tên Người Dùng
            Text(
              AuthServices.CurrentUser?.Name ?? '',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(height: 10),
            // Email Người Dùng

            SizedBox(height: 10),
            // Email người dùng
            Row(
              children: [
                Icon(Icons.email, color: Colors.grey[700]),
                SizedBox(width: 10),
                Text(
                  AuthServices.CurrentUser?.Email ?? '',
                  style: TextStyle(
                    fontSize: 16,
                    color: Colors.grey[700],
                  ),
                ),
              ],
            ),
            SizedBox(height: 10),
            // Số điện thoại người dùng
            Row(
              children: [
                Icon(Icons.phone, color: Colors.grey[700]),
                SizedBox(width: 10),
                Text(
                  AuthServices.CurrentUser?.PhoneNumber ?? '',
                  style: TextStyle(
                    fontSize: 16,
                    color: Colors.grey[700],
                  ),
                ),
              ],
            ),
            // Các Thông Tin Chi Tiết
            // ListTile(
            //   leading: Icon(Icons.person),
            //   title: Text('Tên'),
            //   subtitle: Text(user.name),
            // ),
            // Divider(),
            // ListTile(
            //   leading: Icon(Icons.email),
            //   title: Text('Email'),
            //   subtitle: Text(user.email),
            // ),
            // Divider(),
            // ListTile(
            //   leading: Icon(Icons.phone),
            //   title: Text('Số Điện Thoại'),
            //   subtitle: Text(user.phone),
            // ),
          ],
        ),
      ),
    );
  }
}
