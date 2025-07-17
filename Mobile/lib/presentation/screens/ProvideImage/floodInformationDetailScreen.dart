import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:intl/intl.dart';
import 'package:path_provider/path_provider.dart';
import 'package:share_plus/share_plus.dart';
import 'package:traffic_solution_dsc/core/helper/AuthFunctions.dart';
import 'package:traffic_solution_dsc/core/helper/app_colors.dart';
import 'package:traffic_solution_dsc/core/models/camera/camera.dart';
import 'dart:convert' as convert;
import 'package:http/http.dart' as http;
import 'package:traffic_solution_dsc/core/models/floodInformation/flood_information.dart';
import '../../../core/constraints/color_palatte.dart';
import '../../../core/constraints/dimension_constants.dart';
import '../../../core/helper/text_styles.dart';
import '../../../core/models/placeNear/placeNear.dart';
import '../../widgets/button_widget.dart';

class FloodInformationDetailScreen extends StatefulWidget {
  final String? floodInformationId;

  FloodInformationDetailScreen({required this.floodInformationId});

  @override
  _FloodInformationDetailScreenState createState() =>
      _FloodInformationDetailScreenState();
}

class _FloodInformationDetailScreenState
    extends State<FloodInformationDetailScreen> {
  bool isFollowing = false;
  FloodedInformation? floodedInformation;
  void getFloodedInformation() async {
    try {
      final response = await http.get(Uri.parse(
          'https://flood-information-service.onrender.com/flood-information/${widget.floodInformationId}'));
      print(response.body);
      print(widget.floodInformationId);

      if (response.statusCode == 200) {
        setState(() {
          String decodedBody = utf8.decode(response.bodyBytes);

          floodedInformation =
              FloodedInformation.fromJson(convert.jsonDecode(decodedBody));
        });
      } else {
        throw Exception('Failed to load flooded information');
      }
    } catch (e) {
      throw Exception('Failed to load flooded information: $e');
    }
  }

  @override
  void initState() {
    super.initState();
    getFloodedInformation();
  }

  Future<void> _shareImage() async {
    try {
      if (floodedInformation != null && floodedInformation!.url != null) {
        final imageUrl = floodedInformation!.url ?? '';

        // Lấy ảnh từ URL và lưu vào Clipboard
        final ByteData bytes =
            await NetworkAssetBundle(Uri.parse(imageUrl)).load("");
        final Uint8List list = bytes.buffer.asUint8List();

        final tempDir = await getTemporaryDirectory();
        final file = await File('${tempDir.path}/image.png').create();
        await file.writeAsBytes(list);

        // Sử dụng share_plus để chia sẻ file
        await Share.shareFiles([file.path],
            text: 'Check out this camera image!');
      }
    } catch (e) {
      print('Error sharing image: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Flood Information Detail'),
      ),
      body: floodedInformation == null
          ? Center(
              child: CircularProgressIndicator(),
            )
          : SingleChildScrollView(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(height: 20),
                  Row(
                    crossAxisAlignment:
                        CrossAxisAlignment.start, // Align vertically at the top
                    children: [
                      Expanded(
                        flex: 4,
                        child: Text(
                          'Name: ',
                          style: TextStyle(
                            fontSize: 16,
                            color: Colors.black,
                          ),
                        ),
                      ),
                      SizedBox(width: 10), // Space between label and content
                      Expanded(
                        flex: 10,
                        child: Text(
                          '${floodedInformation!.userName ?? 'Unknown'}',
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
                        flex: 4,
                        child: Text(
                          'Message: ',
                          style: TextStyle(
                            fontSize: 16,
                            color: Colors.black,
                          ),
                        ),
                      ),
                      SizedBox(width: 10), // Space between label and content
                      Expanded(
                        flex: 10,
                        child: Text(
                          '${floodedInformation!.message ?? 'Unknown'}',
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

                  // Live View Image
                  Center(
                    child: Image.network(
                      floodedInformation!.url!,
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
                        'Other Information',
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
                  SizedBox(height: 12), // Space between rows

                  Row(
                    crossAxisAlignment:
                        CrossAxisAlignment.start, // Align vertically at the top
                    children: [
                      Expanded(
                        flex: 4,
                        child: Text(
                          'Position: ',
                          style: TextStyle(
                            fontSize: 16,
                            color: Colors.black,
                          ),
                        ),
                      ),
                      SizedBox(width: 10), // Space between label and content
                      Expanded(
                        flex: 10,
                        child: Text(
                          '${floodedInformation!.latitude ?? 'Unknown'},\n${floodedInformation!.longitude ?? 'Unknown'}',
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
                        flex: 4,
                        child: Text(
                          'Location: ',
                          style: TextStyle(
                            fontSize: 16,
                            color: Colors.black,
                          ),
                        ),
                      ),
                      SizedBox(width: 10), // Space between label and content
                      Expanded(
                        flex: 10,
                        child: Text(
                          '${floodedInformation!.locationName ?? 'Unknown'}',
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
                        flex: 4,
                        child: Text(
                          'Time: ',
                          style: TextStyle(
                            fontSize: 16,
                            color: Colors.black,
                          ),
                        ),
                      ),
                      SizedBox(width: 10), // Space between label and content
                      Expanded(
                        flex: 10,
                        child: Text(
                          '${floodedInformation!.date ?? 'Unknown'}',
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
