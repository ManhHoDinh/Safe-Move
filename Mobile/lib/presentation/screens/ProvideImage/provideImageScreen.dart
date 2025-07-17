import 'dart:convert';
import 'dart:io';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:traffic_solution_dsc/presentation/widgets/button_widget.dart';
import 'package:http_parser/http_parser.dart';
import 'package:http/http.dart' as http;

import '../../../core/constraints/color_palatte.dart';
import 'dart:convert' as convert;

import '../../../core/helper/AuthFunctions.dart';
import '../../../core/models/placeNear/placeNear.dart';

class ProvideImageScreen extends StatefulWidget {
  const ProvideImageScreen({super.key, this.path = ""});
  final String path;

  @override
  State<ProvideImageScreen> createState() => _ProvideImageScreenState();
}

class _ProvideImageScreenState extends State<ProvideImageScreen> {
  TextEditingController messageControl = TextEditingController();
  bool isUploading = false;
  void uploadFloodInfo() async {
    try {
      setState(() {
        isUploading = true;
      });

      final Dio dio = Dio();

      // Prepare multipart request body
      FormData formData = FormData();

      // Add image file as multipart form-data with field name 'file'
      formData.files.add(MapEntry(
        'file', // Correct field name as per Swagger/cURL
        await MultipartFile.fromFile(
          widget.path,
          filename: widget.path.split(Platform.pathSeparator).last,
          contentType: MediaType.parse('image/jpeg'), // Adjust if needed
        ),
      ));

      // Get current location
      LatLng currentLocation = await getUserCurrentLocation();
      print('Current location: $currentLocation');
      PlaceNear placeNear = await getPlaceNear(currentLocation);
      print('Place Near: $placeNear');

      // Prepare flood_info as a Map
      Map<String, dynamic> floodInfoMap = {
        "userName": AuthServices.CurrentUser!.Name,
        "latitude": currentLocation.latitude.toString(),
        "longitude": currentLocation.longitude.toString(),
        "message": messageControl.text,
        "locationName": placeNear.results!.first.address,
        "floodLevel": 1,
        "userId": AuthServices.CurrentUser!.Id,
      };

      // Serialize flood_info to JSON string
      String floodInfo = jsonEncode(floodInfoMap);
      formData.fields.add(MapEntry('flood_info', floodInfo));

      final response = await dio.post(
        'https://flood-information-service.onrender.com/flood-information/',
        data: formData, // Send the image as form data separately
        options: Options(
          headers: {
            'accept': 'application/json',
          },
        ),
      );

      // Handle successful response
      if (response.statusCode == 200) {
        setState(() {
          isUploading = false; // Set to false after successful upload
        });
        print('Response: ${response.data}');
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(
          content:
              Text('Upload successful!', style: TextStyle(color: Colors.green)),
        ));
        //I need add a pop up to show the user that the upload was successful, and come back to the previous screen
        if (response.data['status'] == 'Approved')
          showDialog(
            context: context,
            builder: (BuildContext context) {
              return AlertDialog(
                title: Text('Upload Successful'),
                content: Text(
                    'Your information has been verified that there is a flood.'),
                actions: <Widget>[
                  TextButton(
                    child: Text('OK'),
                    onPressed: () {
                      // Close the dialog
                      Navigator.of(context).pop();
                      // Then pop the current screen and go back to the previous one
                      Navigator.pop(context);
                    },
                  ),
                ],
              );
            },
          );
        else
          showDialog(
            context: context,
            builder: (BuildContext context) {
              return AlertDialog(
                title: Text('Upload Successful'),
                content: Text(
                    'The information you submitted has not detected any flood yet, your information will be reviewed by the admin within 15 minutes.'),
                actions: <Widget>[
                  TextButton(
                    child: Text('OK'),
                    onPressed: () {
                      // Close the dialog
                      Navigator.of(context).pop();
                      // Then pop the current screen and go back to the previous one
                      Navigator.pop(context);
                    },
                  ),
                ],
              );
            },
          );
      } else {
        setState(() {
          isUploading = false; // Set to false on error as well
        });
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(
          content: Text('Error: ${response.statusCode}',
              style: TextStyle(color: Colors.red)),
        ));
      }
    } on DioError catch (e) {
      setState(() {
        isUploading = false;
      });
      String errorMessage = 'Unknown error';
      if (e.response != null) {
        errorMessage =
            'Error: ${e.response?.statusCode} ${e.response?.statusMessage}';
        // Optionally, log the response data for more details
        print('Response data: ${e.response?.data}');
      } else {
        errorMessage = 'Error sending request: ${e.message}';
      }
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        content: Text(errorMessage, style: TextStyle(color: Colors.red)),
      ));
    } catch (e) {
      setState(() {
        isUploading = false;
      });
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        content:
            Text('Unexpected error: $e', style: TextStyle(color: Colors.red)),
      ));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Sharing Information"),
        leading: IconButton(
          icon: Icon(Icons.arrow_back),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
      ),
      body: isUploading
          ? Center(
              child: CircularProgressIndicator(),
            )
          : Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 20),
              child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text("Share your current traffic situation!",
                        style: TextStyle(
                            fontSize: 20, fontWeight: FontWeight.bold)),
                    SizedBox(height: 10),
                    Text(
                        "This information will be sent along with your current time and location."),
                    SizedBox(height: 20),
                    TextFormField(
                      controller: messageControl,
                      decoration: InputDecoration(
                        border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(15)),
                      ),
                      maxLines: 6,
                    ),
                    SizedBox(height: 10),

                    // Row(
                    //   children: [
                    //     Text("Flood Level: "),
                    //     SizedBox(
                    //       width: 150, // Đặt chiều rộng cho combobox
                    //       child: DropdownButtonHideUnderline(
                    //         child: DropdownButtonFormField<String>(
                    //           value: selectedValue,
                    //           isExpanded: true, // Giúp dropdown menu vừa với combobox
                    //           items: items.map((String item) {
                    //             return DropdownMenuItem<String>(
                    //               value: item,
                    //               child: Text(item),
                    //             );
                    //           }).toList(),
                    //           onChanged: (String? newValue) {
                    //             setState(() {
                    //               selectedValue = newValue;
                    //             });
                    //           },
                    //           decoration: InputDecoration(
                    //             border: OutlineInputBorder(
                    //               borderRadius: BorderRadius.circular(8.0),
                    //               borderSide: BorderSide(color: Colors.blue, width: 2.0),
                    //             ),
                    //             isDense: true, // Giúp phần input decoration gọn hơn
                    //             contentPadding:
                    //                 EdgeInsets.symmetric(vertical: 8, horizontal: 8),
                    //           ),
                    //           dropdownColor: Colors.white, // Màu nền của dropdown
                    //         ),
                    //       ),
                    //     ),
                    //   ],
                    // ),

                    SizedBox(height: 20),
                    ButtonWidget(
                      label: 'Submit',
                      color: ColorPalette.primaryColor,
                      textColor: Colors.white,
                      onTap: () async {
                        uploadFloodInfo();
                      },
                    ),
                  ]),
            ),
    );
  }

  Future<LatLng> getUserCurrentLocation() async {
    await Geolocator.requestPermission()
        .then((value) {})
        .onError((error, stackTrace) async {
      await Geolocator.requestPermission();
      print("ERROR" + error.toString());
    });
    Position currentPosition = await Geolocator.getCurrentPosition();

    return LatLng(currentPosition.latitude, currentPosition.longitude);
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
      print(e);
      return PlaceNear();
    }
  }
}
