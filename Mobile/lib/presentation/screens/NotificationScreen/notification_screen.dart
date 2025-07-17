import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:http/http.dart' as http;
import 'package:traffic_solution_dsc/core/helper/AuthFunctions.dart';
import '../../../core/models/notification/notificationModel.dart';

class NotificationHistoryScreen extends StatefulWidget {
  NotificationHistoryScreen();

  @override
  _NotificationHistoryScreenState createState() =>
      _NotificationHistoryScreenState();
}

class _NotificationHistoryScreenState extends State<NotificationHistoryScreen> {
  late Future<List<NotificationModel>> futureNotifications;

  @override
  void initState() {
    super.initState();
    futureNotifications = fetchNotifications(AuthServices.CurrentUser!.Id);
  }

  Future<List<NotificationModel>> fetchNotifications(String userId) async {
    // Define the Hanoi timezone
    // Construct the URI with query parameters
    final uri = Uri.parse(
      'https://notification-service-latest.onrender.com/notifications/$userId',
    ).replace(queryParameters: {
      'skip': '0',
      'limit': '100',
    });

    try {
      // Make the GET request with the appropriate headers
      final response = await http.get(
        uri,
        headers: {
          'Accept': 'application/json',
        },
      );

      // Check if the request was successful
      if (response.statusCode == 200) {
        // Decode the JSON response
        String decodedBody = utf8.decode(response.bodyBytes);
        List<dynamic> body = jsonDecode(decodedBody);
        print('Raw JSON Response: $body');

        // Map the JSON objects to NotificationModel instances
        List<NotificationModel> notifications = body
            .map(
              (dynamic item) =>
                  NotificationModel.fromJson(item as Map<String, dynamic>),
            )
            .toList();
        print('Parsed Notifications: $notifications');

        return notifications;
      } else {
        // Handle errors or unexpected status codes
        print(
            'Failed to load notifications. Status Code: ${response.statusCode}');
        return [];
      }
    } catch (e) {
      // Handle any exceptions during the HTTP request or JSON parsing
      print('Error fetching notifications: $e');
      return [];
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Notification History'),
      ),
      body: FutureBuilder<List<NotificationModel>>(
        future: futureNotifications,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            // Show loading indicator while waiting for data
            return Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            // Show error message if there's an error
            return Center(child: Text('Error: ${snapshot.error}'));
          } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            // Show message if there's no data
            return Center(child: Text('No notifications found.'));
          } else {
            // Display the list of notifications
            List<NotificationModel> notifications = snapshot.data!;
            return ListView.builder(
              itemCount: notifications.length,
              itemBuilder: (context, index) {
                NotificationModel notification = notifications[index];
                return ListTile(
                  leading: Icon(Icons.notifications),
                  title: Text(notification.title),
                  subtitle: Text(notification.message),
                  trailing: Text(
                    DateFormat('dd/MM/yyyy HH:mm')
                        .format(notification.timestamp),
                    style: TextStyle(fontSize: 12, color: Colors.grey),
                  ),
                );
              },
            );
          }
        },
      ),
    );
  }
}
