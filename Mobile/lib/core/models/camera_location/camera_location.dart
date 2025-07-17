import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:flutter/foundation.dart';
part 'camera_location.freezed.dart';
part 'camera_location.g.dart';

@freezed
class CameraLocation with _$CameraLocation {
  const factory CameraLocation({
    String? type,
    List<double>? coordinates,
  }) = _CameraLocation;

  factory CameraLocation.fromJson(Map<String, Object?> json) =>
      _$CameraLocationFromJson(json);
}
