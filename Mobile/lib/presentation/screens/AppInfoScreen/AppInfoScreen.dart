import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class AppInfoScreen extends StatelessWidget {
  const AppInfoScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // Sử dụng Scaffold để tạo cấu trúc cơ bản cho màn hình
    return Scaffold(
      appBar: AppBar(
        title: Text('Chi Tiết Ứng Dụng'),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Tiêu đề ứng dụng
            Center(
              child: Text(
                'Safe Move',
                style: TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.bold,
                  color: Colors.blueAccent,
                ),
              ),
            ),
            SizedBox(height: 20),
            // Mô tả ứng dụng
            Text(
              'Safe Move là ứng dụng giúp người dùng nhận diện các thông báo nguy hiểm và cung cấp chỉ dẫn đường đi an toàn. Ứng dụng sử dụng công nghệ hiện đại để đảm bảo an toàn cho người dùng trong mọi tình huống.',
              style: TextStyle(fontSize: 16),
              textAlign: TextAlign.justify,
            ),
            SizedBox(height: 20),
            // Thông tin nhóm phát triển
            Text(
              'Nhóm Phát Triển:',
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(height: 10),
            // Danh sách thành viên
            ListTile(
              leading: Icon(Icons.person),
              title: Text('21522327 - Hồ Đình Mạnh'),
            ),
            ListTile(
              leading: Icon(Icons.person),
              title: Text('21522441 - Lê Thị Bích Hằng'),
            ),
            SizedBox(height: 20),
            // Thông tin giảng viên hướng dẫn
            Text(
              'Giảng Viên Hướng Dẫn:',
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(height: 10),
            ListTile(
              leading: Icon(Icons.person_outline),
              title: Text('Tiến Sĩ Nguyễn Tấn Trần Minh Khang'),
            ),
            ListTile(
              leading: Icon(Icons.person_outline),
              title: Text('Tiến Sĩ Nguyễn Duy Khánh'),
            ),
            SizedBox(height: 20),
            // Thông Tin Liên Hệ
            Text(
              'Thông Tin Liên Hệ:',
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(height: 10),
            // Số điện thoại
            ListTile(
              leading: Icon(Icons.phone),
              title: Text('Điện Thoại: +84 582 192 103'),
              onTap: () {
                launchUrl(
                  Uri(
                    scheme: 'tel',
                    path: '+84582192103',
                  ),
                );
              },
            ),
            // Email
            ListTile(
              leading: Icon(Icons.email),
              title: Text('Email: 21522327@gm.uit.edu.vn'),
              onTap: () {
                launchUrl(Uri(
                  scheme: 'mailto',
                  path: '21522327@gm.uit.edu.vn',
                ));
              },
            ),
            // Facebook
          ],
        ),
      ),
    );
  }
}
