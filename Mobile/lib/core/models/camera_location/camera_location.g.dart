// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'camera_location.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$_CameraLocation _$$_CameraLocationFromJson(Map<String, dynamic> json) =>
    _$_CameraLocation(
      type: json['type'] as String?,
      coordinates: (json['coordinates'] as List<dynamic>?)
          ?.map((e) => (e as num).toDouble())
          .toList(),
    );

Map<String, dynamic> _$$_CameraLocationToJson(_$_CameraLocation instance) =>
    <String, dynamic>{
      'type': instance.type,
      'coordinates': instance.coordinates,
    };
