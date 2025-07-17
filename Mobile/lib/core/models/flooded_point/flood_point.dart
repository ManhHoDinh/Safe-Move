import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:flutter/foundation.dart';
part 'flood_point.freezed.dart';
part 'flood_point.g.dart';

@freezed
class FloodedPoint with _$FloodedPoint {
  const factory FloodedPoint({
    int? id,
    String? name,
    double? latitude,
    double? longitude,
    int? floodLevel,
    String? expirationTime,
    String? flood_information_id,
  }) = _FloodedPoint;

  factory FloodedPoint.fromJson(Map<String, Object?> json) =>
      _$FloodedPointFromJson(json);
}
