// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'flood_point.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$_FloodedPoint _$$_FloodedPointFromJson(Map<String, dynamic> json) =>
    _$_FloodedPoint(
      id: json['id'] as int?,
      name: json['name'] as String?,
      latitude: (json['latitude'] as num?)?.toDouble(),
      longitude: (json['longitude'] as num?)?.toDouble(),
      floodLevel: json['floodLevel'] as int?,
      expirationTime: json['expirationTime'] as String?,
      flood_information_id: json['flood_information_id'] as String?,
    );

Map<String, dynamic> _$$_FloodedPointToJson(_$_FloodedPoint instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'latitude': instance.latitude,
      'longitude': instance.longitude,
      'floodLevel': instance.floodLevel,
      'expirationTime': instance.expirationTime,
      'flood_information_id': instance.flood_information_id,
    };
