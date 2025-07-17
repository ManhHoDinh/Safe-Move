import 'dart:convert';

import 'package:bloc/bloc.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:geolocator/geolocator.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:http/http.dart' as http;
import 'package:traffic_solution_dsc/core/constraints/status.dart';
import 'package:traffic_solution_dsc/core/models/camera/camera.dart';
import 'package:traffic_solution_dsc/core/models/placeNear/placeNear.dart';
import 'dart:convert' as convert;

part 'camera_detail_state.dart';
part 'camera_detail_cubit.freezed.dart';

class CameraDetailCubit extends Cubit<CameraDetailState> {
  CameraDetailCubit() : super(CameraDetailState.initial(data: CameraDetailStateData()));
  void setCameraPosition(LatLng latLng) {
    try {
      emit(CameraDetailState.loading(
          data: state.data!.copyWith(status: StatusType.loading)));
      CameraPosition _camera = CameraPosition(
        target: latLng,
        zoom: 13,
      );
      emit(CameraDetailState.getLocationSelectedCamera(
          data: state.data!.copyWith(locationSelectedCamera: _camera)));
    } catch (e) {
      emit(CameraDetailState.error(data: state.data!.copyWith(error: e.toString())));
    }
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
   void setCurrentLocation() async{
    try {
      emit(CameraDetailState.loading(
          data: state.data!.copyWith(status: StatusType.loading)));
      CameraPosition _camera = CameraPosition(
        target: await getUserCurrentLocation(),
        zoom: 13,
      );
      
      emit(CameraDetailState.getLocationSelectedCamera(
          data: state.data!.copyWith(locationSelectedCamera: _camera)));
    } catch (e) {
      emit(CameraDetailState.error(data: state.data!.copyWith(error: e.toString())));
    }
  }
    

  Future<List<Camera>> fetchCameras() async {
    final response = await http.get(
      Uri.parse(
          'https://api.notis.vn/v4/cameras/bybbox?lat1=11.160767&lng1=106.554166&lat2=9.45&lng2=128.99999'),
      headers: {
        'accept': 'application/json',
        'device-id': 'bf738a0a3e6eddc2',
      },
    );

    if (response.statusCode == 200) {
      print(response.body);
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to load cameras');
    }
  }

}
