// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'flood_point.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

FloodedPoint _$FloodedPointFromJson(Map<String, dynamic> json) {
  return _FloodedPoint.fromJson(json);
}

/// @nodoc
mixin _$FloodedPoint {
  int? get id => throw _privateConstructorUsedError;
  String? get name => throw _privateConstructorUsedError;
  double? get latitude => throw _privateConstructorUsedError;
  double? get longitude => throw _privateConstructorUsedError;
  int? get floodLevel => throw _privateConstructorUsedError;
  String? get expirationTime => throw _privateConstructorUsedError;
  String? get flood_information_id => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $FloodedPointCopyWith<FloodedPoint> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $FloodedPointCopyWith<$Res> {
  factory $FloodedPointCopyWith(
          FloodedPoint value, $Res Function(FloodedPoint) then) =
      _$FloodedPointCopyWithImpl<$Res, FloodedPoint>;
  @useResult
  $Res call(
      {int? id,
      String? name,
      double? latitude,
      double? longitude,
      int? floodLevel,
      String? expirationTime,
      String? flood_information_id});
}

/// @nodoc
class _$FloodedPointCopyWithImpl<$Res, $Val extends FloodedPoint>
    implements $FloodedPointCopyWith<$Res> {
  _$FloodedPointCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = freezed,
    Object? name = freezed,
    Object? latitude = freezed,
    Object? longitude = freezed,
    Object? floodLevel = freezed,
    Object? expirationTime = freezed,
    Object? flood_information_id = freezed,
  }) {
    return _then(_value.copyWith(
      id: freezed == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as int?,
      name: freezed == name
          ? _value.name
          : name // ignore: cast_nullable_to_non_nullable
              as String?,
      latitude: freezed == latitude
          ? _value.latitude
          : latitude // ignore: cast_nullable_to_non_nullable
              as double?,
      longitude: freezed == longitude
          ? _value.longitude
          : longitude // ignore: cast_nullable_to_non_nullable
              as double?,
      floodLevel: freezed == floodLevel
          ? _value.floodLevel
          : floodLevel // ignore: cast_nullable_to_non_nullable
              as int?,
      expirationTime: freezed == expirationTime
          ? _value.expirationTime
          : expirationTime // ignore: cast_nullable_to_non_nullable
              as String?,
      flood_information_id: freezed == flood_information_id
          ? _value.flood_information_id
          : flood_information_id // ignore: cast_nullable_to_non_nullable
              as String?,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$_FloodedPointCopyWith<$Res>
    implements $FloodedPointCopyWith<$Res> {
  factory _$$_FloodedPointCopyWith(
          _$_FloodedPoint value, $Res Function(_$_FloodedPoint) then) =
      __$$_FloodedPointCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {int? id,
      String? name,
      double? latitude,
      double? longitude,
      int? floodLevel,
      String? expirationTime,
      String? flood_information_id});
}

/// @nodoc
class __$$_FloodedPointCopyWithImpl<$Res>
    extends _$FloodedPointCopyWithImpl<$Res, _$_FloodedPoint>
    implements _$$_FloodedPointCopyWith<$Res> {
  __$$_FloodedPointCopyWithImpl(
      _$_FloodedPoint _value, $Res Function(_$_FloodedPoint) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = freezed,
    Object? name = freezed,
    Object? latitude = freezed,
    Object? longitude = freezed,
    Object? floodLevel = freezed,
    Object? expirationTime = freezed,
    Object? flood_information_id = freezed,
  }) {
    return _then(_$_FloodedPoint(
      id: freezed == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as int?,
      name: freezed == name
          ? _value.name
          : name // ignore: cast_nullable_to_non_nullable
              as String?,
      latitude: freezed == latitude
          ? _value.latitude
          : latitude // ignore: cast_nullable_to_non_nullable
              as double?,
      longitude: freezed == longitude
          ? _value.longitude
          : longitude // ignore: cast_nullable_to_non_nullable
              as double?,
      floodLevel: freezed == floodLevel
          ? _value.floodLevel
          : floodLevel // ignore: cast_nullable_to_non_nullable
              as int?,
      expirationTime: freezed == expirationTime
          ? _value.expirationTime
          : expirationTime // ignore: cast_nullable_to_non_nullable
              as String?,
      flood_information_id: freezed == flood_information_id
          ? _value.flood_information_id
          : flood_information_id // ignore: cast_nullable_to_non_nullable
              as String?,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$_FloodedPoint with DiagnosticableTreeMixin implements _FloodedPoint {
  const _$_FloodedPoint(
      {this.id,
      this.name,
      this.latitude,
      this.longitude,
      this.floodLevel,
      this.expirationTime,
      this.flood_information_id});

  factory _$_FloodedPoint.fromJson(Map<String, dynamic> json) =>
      _$$_FloodedPointFromJson(json);

  @override
  final int? id;
  @override
  final String? name;
  @override
  final double? latitude;
  @override
  final double? longitude;
  @override
  final int? floodLevel;
  @override
  final String? expirationTime;
  @override
  final String? flood_information_id;

  @override
  String toString({DiagnosticLevel minLevel = DiagnosticLevel.info}) {
    return 'FloodedPoint(id: $id, name: $name, latitude: $latitude, longitude: $longitude, floodLevel: $floodLevel, expirationTime: $expirationTime, flood_information_id: $flood_information_id)';
  }

  @override
  void debugFillProperties(DiagnosticPropertiesBuilder properties) {
    super.debugFillProperties(properties);
    properties
      ..add(DiagnosticsProperty('type', 'FloodedPoint'))
      ..add(DiagnosticsProperty('id', id))
      ..add(DiagnosticsProperty('name', name))
      ..add(DiagnosticsProperty('latitude', latitude))
      ..add(DiagnosticsProperty('longitude', longitude))
      ..add(DiagnosticsProperty('floodLevel', floodLevel))
      ..add(DiagnosticsProperty('expirationTime', expirationTime))
      ..add(DiagnosticsProperty('flood_information_id', flood_information_id));
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_FloodedPoint &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.name, name) || other.name == name) &&
            (identical(other.latitude, latitude) ||
                other.latitude == latitude) &&
            (identical(other.longitude, longitude) ||
                other.longitude == longitude) &&
            (identical(other.floodLevel, floodLevel) ||
                other.floodLevel == floodLevel) &&
            (identical(other.expirationTime, expirationTime) ||
                other.expirationTime == expirationTime) &&
            (identical(other.flood_information_id, flood_information_id) ||
                other.flood_information_id == flood_information_id));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(runtimeType, id, name, latitude, longitude,
      floodLevel, expirationTime, flood_information_id);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_FloodedPointCopyWith<_$_FloodedPoint> get copyWith =>
      __$$_FloodedPointCopyWithImpl<_$_FloodedPoint>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$_FloodedPointToJson(
      this,
    );
  }
}

abstract class _FloodedPoint implements FloodedPoint {
  const factory _FloodedPoint(
      {final int? id,
      final String? name,
      final double? latitude,
      final double? longitude,
      final int? floodLevel,
      final String? expirationTime,
      final String? flood_information_id}) = _$_FloodedPoint;

  factory _FloodedPoint.fromJson(Map<String, dynamic> json) =
      _$_FloodedPoint.fromJson;

  @override
  int? get id;
  @override
  String? get name;
  @override
  double? get latitude;
  @override
  double? get longitude;
  @override
  int? get floodLevel;
  @override
  String? get expirationTime;
  @override
  String? get flood_information_id;
  @override
  @JsonKey(ignore: true)
  _$$_FloodedPointCopyWith<_$_FloodedPoint> get copyWith =>
      throw _privateConstructorUsedError;
}
