import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:flutter/foundation.dart';

import '../camera_location/camera_location.dart';
part 'camera.freezed.dart';
part 'camera.g.dart';

@freezed
class Camera with _$Camera {
  const factory Camera({
    @JsonKey(name: '_id') String? id,
    String? name,
    @JsonKey(name: 'loc') CameraLocation? location,
    String? dist,
    bool? ptz,
    int? angle,
    String? liveviewUrl,
  }) = _Camera;

  factory Camera.fromJson(Map<String, Object?> json) => _$CameraFromJson(json);
}
