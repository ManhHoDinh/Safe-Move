import 'dart:convert';

import 'package:bloc/bloc.dart';
import 'package:flutter/material.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:http/http.dart' as http;
import 'package:traffic_solution_dsc/core/models/direction/direction.dart';
import 'package:traffic_solution_dsc/core/models/direction/route.dart';
import 'package:traffic_solution_dsc/core/models/flooded_point/flood_point.dart';
import 'package:traffic_solution_dsc/presentation/screens/Direction/SubScreen/cubit/flexible_polyline.dart';
import 'dart:convert' as convert;

import '../../../../../core/models/direction/geometry.dart';
import '../../../../../core/models/routeInfo/routeInfo.dart';

part 'direction_state.dart';
part 'direction_cubit.freezed.dart';

class DirectionCubit extends Cubit<DirectionState> {
  DirectionCubit() : super(DirectionState.initial());

  void getDirection(sourceText, LatLng source, destinationText,
      LatLng destination, List<FloodedPoint> floodedPoints) async {
    try {
      print('loading');
      emit(DirectionState.loading());
      Set<Polyline> polylines = {};
      var route = await geDirectionAPI(sourceText, source, destinationText,
          destination, floodedPoints, false);
      var route2 = await geDirectionAPI(sourceText, source, destinationText,
          destination, floodedPoints, true);
      polylines.add(Polyline(
        consumeTapEvents: true,
        polylineId: PolylineId('1'),
        points: route.routePoints,
        color: Colors.red,
        onTap: () {
          emit(DirectionState.loading());

          emit(DirectionState.loaded(sourceText, source, destinationText,
              destination, route.travelTime, route.distance, polylines));
        },
      ));
      polylines.add(Polyline(
        polylineId: PolylineId('2'),
        points: route2.routePoints,
        color: Colors.green,
        consumeTapEvents: true,
        onTap: () {
          emit(DirectionState.loading());

          emit(DirectionState.loaded(sourceText, source, destinationText,
              destination, route2.travelTime, route2.distance, polylines));
        },
      ));
      emit(DirectionState.loaded(sourceText, source, destinationText,
          destination, route2.travelTime, route2.distance, polylines));
    } catch (error) {
      print(error);
      emit(DirectionState.error(error.toString()));
    }
  }

  // Future<Direction> geDirectionAPI(
  //     sourceText, LatLng source, destinationText, LatLng destination) async {
  //   final headers = {
  //     'X-RapidAPI-Host': 'trueway-directions2.p.rapidapi.com',
  //     'X-RapidAPI-Key': 'b1a1bfce34msh0287fa31caec574p100443jsnd9d5e7fc04c2',
  //   };

  //   final params = {
  //     'origin': '${source.latitude},${source.longitude}',
  //     'destination': '${destination.latitude},${destination.longitude}',
  //   };

  //   final url =
  //       Uri.parse('https://trueway-directions2.p.rapidapi.com/FindDrivingPath')
  //           .replace(queryParameters: params);

  //   final res = await http.get(url, headers: headers);
  //   final status = res.statusCode;
  //   if (status != 200) throw Exception('http.get error: statusCode= $status');
  //   var json = convert.jsonDecode(res.body);
  //   Direction result = Direction.fromJson(json);
  //   return result;
  // }

  Future<RouteInfo> geDirectionAPI(
    String sourceText,
    LatLng source,
    String destinationText,
    LatLng destination,
    List<FloodedPoint> floodPoints,
    bool isAvoid,
  ) async {
    final String apiKey =
        'mCw9j3Y8s1Ppz82DFAH9qT1LWzJzVGTDyVg6g6f3148'; // Thay thế bằng API key thực tế của bạn

    // Xây dựng các tham số cơ bản
    final Map<String, String> params = {
      'apikey': apiKey,
      'origin': '${source.latitude},${source.longitude}',
      'destination': '${destination.latitude},${destination.longitude}',
      'transportMode': 'car',
      'return':
          'polyline,summary', // Yêu cầu thêm summary để lấy distance và travel time
      'routingMode': 'fast',
      'traffic': 'enabled',
    };
    print('Flood Points: $floodPoints');

    // Nếu có các điểm lũ, thêm chúng vào tham số avoid[areas]
    if (isAvoid) {
      if (floodPoints.isNotEmpty) {
        // Tạo chuỗi avoid[areas] theo định dạng API
        // Mỗi vùng tránh được định nghĩa dưới dạng "bbox:minLng,minLat,maxLng,maxLat"
        // Khoảng cách 100 mét tương đương ~0.001 độ, bạn có thể điều chỉnh tùy nhu cầu
        double delta = 0.001; // ~100 mét

        String avoidAreas = floodPoints.map((fp) {
          double minLng = (fp.longitude ?? 0) - delta;
          double minLat = (fp.latitude ?? 0) - delta;
          double maxLng = (fp.longitude ?? 0) + delta;
          double maxLat = (fp.latitude ?? 0) + delta;
          return 'bbox:$minLng,$minLat,$maxLng,$maxLat';
        }).join(';');

        params['avoid[areas]'] = avoidAreas;
      }
    }

    // Tạo URL với các tham số đã xây dựng
    final Uri url = Uri.https('router.hereapi.com', '/v8/routes', params);
    print('Request URL: $url');

    // Thực hiện yêu cầu HTTP GET
    final http.Response response = await http.get(url);

    if (response.statusCode == 200) {
      final Map<String, dynamic> data = jsonDecode(response.body);

      // Kiểm tra và trích xuất các thông tin cần thiết từ phản hồi
      if (data['routes'] != null && data['routes'].isNotEmpty) {
        final Map<String, dynamic> route = data['routes'][0];
        final Map<String, dynamic> section = route['sections'][0];

        // Trích xuất polyline
        final String polyline = section['polyline'];
        List<LatLng> routePoints = FlexiblePolyline.decode(polyline)
            .map((e) => LatLng(e.lat, e.lng))
            .toList();

        // Trích xuất thông tin summary
        final Map<String, dynamic> summary = section['summary'];
        final double distance =
            summary['length']?.toDouble() ?? 0.0; // Tính bằng mét
        final int travelTimeInSeconds = summary['duration']?.toInt() ?? 0;
        final Duration travelTime = Duration(seconds: travelTimeInSeconds);

        return RouteInfo(
          routePoints: routePoints,
          travelTime: travelTime,
          distance: distance,
        );
      } else {
        throw Exception('Không tìm thấy lộ trình trong phản hồi API.');
      }
    } else {
      throw Exception(
          'Failed to load route data: ${response.statusCode} - ${response.reasonPhrase}');
    }
  }
}
