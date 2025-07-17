import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:flutter/foundation.dart';
part 'flood_information.freezed.dart';
part 'flood_information.g.dart';

@freezed
class FloodedInformation with _$FloodedInformation {
  const factory FloodedInformation({
    String? id,
    String? userName,
    double? latitude,
    double? longitude,
    String? locationName,
    DateTime? date,
    String? status,
    String? message,
    String? userId,
    String? url,

  }) = _FloodedInformation;

  factory FloodedInformation.fromJson(Map<String, Object?> json) =>
      _$FloodedInformationFromJson(json);
}
