import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';

class NotificationService {
  final FirebaseMessaging _firebaseMessaging = FirebaseMessaging.instance;
  static final  FlutterLocalNotificationsPlugin _flutterLocalNotificationsPlugin =
      FlutterLocalNotificationsPlugin();

  Future<void> initialize() async {
    // Yêu cầu quyền nhận thông báo (chỉ iOS)
    await _firebaseMessaging.requestPermission();
    // Lắng nghe khi có thông báo ở foreground
    FirebaseMessaging.onMessage.listen((RemoteMessage message) {
      if (message.notification != null) {
        print("=====================================");
        print(message.notification!.title);
        showNotification(
          message.notification!.title,
          message.notification!.body,
        );
      }
    });

    // Lắng nghe khi có thông báo được nhấn và mở ứng dụng
    FirebaseMessaging.onMessageOpenedApp.listen((RemoteMessage message) {
      print('Thông báo được nhấn: ${message.notification?.title}');
    });

    // Lấy token FCM của thiết bị
    _firebaseMessaging.getToken().then((token) {
      print("FCM Token: $token");
      // Gửi token lên server để đăng ký thông báo push nếu cần thiết
    });
  }

  // Thiết lập thông báo cục bộ
  static Future<void> showNotification(String? title, String? body) async {
    const AndroidNotificationDetails androidDetails =
        AndroidNotificationDetails(
      'channel_id',
      'channel_name',
      importance: Importance.max,
      priority: Priority.high,
      icon: 'launcher_icon',
    );

    const NotificationDetails notificationDetails =
        NotificationDetails(android: androidDetails);

    await _flutterLocalNotificationsPlugin.show(
      0,
      title,
      body,
      notificationDetails,
    );
  }
}
