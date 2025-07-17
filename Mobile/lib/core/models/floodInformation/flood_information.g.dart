// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'flood_information.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$_FloodedInformation _$$_FloodedInformationFromJson(
        Map<String, dynamic> json) =>
    _$_FloodedInformation(
      id: json['id'] as String?,
      userName: json['userName'] as String?,
      latitude: (json['latitude'] as num?)?.toDouble(),
      longitude: (json['longitude'] as num?)?.toDouble(),
      locationName: json['locationName'] as String?,
      date:
          json['date'] == null ? null : DateTime.parse(json['date'] as String),
      status: json['status'] as String?,
      message: json['message'] as String?,
      userId: json['userId'] as String?,
      url: json['url'] as String?,
    );

Map<String, dynamic> _$$_FloodedInformationToJson(
        _$_FloodedInformation instance) =>
    <String, dynamic>{
      'id': instance.id,
      'userName': instance.userName,
      'latitude': instance.latitude,
      'longitude': instance.longitude,
      'locationName': instance.locationName,
      'date': instance.date?.toIso8601String(),
      'status': instance.status,
      'message': instance.message,
      'userId': instance.userId,
      'url': instance.url,
    };
