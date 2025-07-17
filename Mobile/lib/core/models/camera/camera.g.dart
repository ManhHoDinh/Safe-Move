// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'camera.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$_Camera _$$_CameraFromJson(Map<String, dynamic> json) => _$_Camera(
      id: json['_id'] as String?,
      name: json['name'] as String?,
      location: json['loc'] == null
          ? null
          : CameraLocation.fromJson(json['loc'] as Map<String, dynamic>),
      dist: json['dist'] as String?,
      ptz: json['ptz'] as bool?,
      angle: json['angle'] as int?,
      liveviewUrl: json['liveviewUrl'] as String?,
    );

Map<String, dynamic> _$$_CameraToJson(_$_Camera instance) => <String, dynamic>{
      '_id': instance.id,
      'name': instance.name,
      'loc': instance.location,
      'dist': instance.dist,
      'ptz': instance.ptz,
      'angle': instance.angle,
      'liveviewUrl': instance.liveviewUrl,
    };
