import 'dart:convert';
import 'package:http/http.dart' as http;

Future<void> sendNotification({
  required String userId,
  required String title,
  required String message,
}) async {
  final url = Uri.parse(
      'https://notification-service-latest.onrender.com/notifications/');

  final headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  final body = jsonEncode({
    'user_id': userId,
    'title': title,
    'message': message,
  });

  try {
    final response = await http.post(
      url,
      headers: headers,
      body: body,
    );

    if (response.statusCode == 200) {
      print('Notification sent successfully');
    } else {
      print(body);
      print('Failed to send notification: ${response.statusCode}');
    }
  } catch (error) {
    print('Error: $error');
  }
}
