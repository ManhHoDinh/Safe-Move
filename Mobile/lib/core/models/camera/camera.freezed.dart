// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'camera.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

Camera _$CameraFromJson(Map<String, dynamic> json) {
  return _Camera.fromJson(json);
}

/// @nodoc
mixin _$Camera {
  @JsonKey(name: '_id')
  String? get id => throw _privateConstructorUsedError;
  String? get name => throw _privateConstructorUsedError;
  @JsonKey(name: 'loc')
  CameraLocation? get location => throw _privateConstructorUsedError;
  String? get dist => throw _privateConstructorUsedError;
  bool? get ptz => throw _privateConstructorUsedError;
  int? get angle => throw _privateConstructorUsedError;
  String? get liveviewUrl => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $CameraCopyWith<Camera> get copyWith => throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $CameraCopyWith<$Res> {
  factory $CameraCopyWith(Camera value, $Res Function(Camera) then) =
      _$CameraCopyWithImpl<$Res, Camera>;
  @useResult
  $Res call(
      {@JsonKey(name: '_id') String? id,
      String? name,
      @JsonKey(name: 'loc') CameraLocation? location,
      String? dist,
      bool? ptz,
      int? angle,
      String? liveviewUrl});

  $CameraLocationCopyWith<$Res>? get location;
}

/// @nodoc
class _$CameraCopyWithImpl<$Res, $Val extends Camera>
    implements $CameraCopyWith<$Res> {
  _$CameraCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = freezed,
    Object? name = freezed,
    Object? location = freezed,
    Object? dist = freezed,
    Object? ptz = freezed,
    Object? angle = freezed,
    Object? liveviewUrl = freezed,
  }) {
    return _then(_value.copyWith(
      id: freezed == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String?,
      name: freezed == name
          ? _value.name
          : name // ignore: cast_nullable_to_non_nullable
              as String?,
      location: freezed == location
          ? _value.location
          : location // ignore: cast_nullable_to_non_nullable
              as CameraLocation?,
      dist: freezed == dist
          ? _value.dist
          : dist // ignore: cast_nullable_to_non_nullable
              as String?,
      ptz: freezed == ptz
          ? _value.ptz
          : ptz // ignore: cast_nullable_to_non_nullable
              as bool?,
      angle: freezed == angle
          ? _value.angle
          : angle // ignore: cast_nullable_to_non_nullable
              as int?,
      liveviewUrl: freezed == liveviewUrl
          ? _value.liveviewUrl
          : liveviewUrl // ignore: cast_nullable_to_non_nullable
              as String?,
    ) as $Val);
  }

  @override
  @pragma('vm:prefer-inline')
  $CameraLocationCopyWith<$Res>? get location {
    if (_value.location == null) {
      return null;
    }

    return $CameraLocationCopyWith<$Res>(_value.location!, (value) {
      return _then(_value.copyWith(location: value) as $Val);
    });
  }
}

/// @nodoc
abstract class _$$_CameraCopyWith<$Res> implements $CameraCopyWith<$Res> {
  factory _$$_CameraCopyWith(_$_Camera value, $Res Function(_$_Camera) then) =
      __$$_CameraCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {@JsonKey(name: '_id') String? id,
      String? name,
      @JsonKey(name: 'loc') CameraLocation? location,
      String? dist,
      bool? ptz,
      int? angle,
      String? liveviewUrl});

  @override
  $CameraLocationCopyWith<$Res>? get location;
}

/// @nodoc
class __$$_CameraCopyWithImpl<$Res>
    extends _$CameraCopyWithImpl<$Res, _$_Camera>
    implements _$$_CameraCopyWith<$Res> {
  __$$_CameraCopyWithImpl(_$_Camera _value, $Res Function(_$_Camera) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = freezed,
    Object? name = freezed,
    Object? location = freezed,
    Object? dist = freezed,
    Object? ptz = freezed,
    Object? angle = freezed,
    Object? liveviewUrl = freezed,
  }) {
    return _then(_$_Camera(
      id: freezed == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String?,
      name: freezed == name
          ? _value.name
          : name // ignore: cast_nullable_to_non_nullable
              as String?,
      location: freezed == location
          ? _value.location
          : location // ignore: cast_nullable_to_non_nullable
              as CameraLocation?,
      dist: freezed == dist
          ? _value.dist
          : dist // ignore: cast_nullable_to_non_nullable
              as String?,
      ptz: freezed == ptz
          ? _value.ptz
          : ptz // ignore: cast_nullable_to_non_nullable
              as bool?,
      angle: freezed == angle
          ? _value.angle
          : angle // ignore: cast_nullable_to_non_nullable
              as int?,
      liveviewUrl: freezed == liveviewUrl
          ? _value.liveviewUrl
          : liveviewUrl // ignore: cast_nullable_to_non_nullable
              as String?,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$_Camera with DiagnosticableTreeMixin implements _Camera {
  const _$_Camera(
      {@JsonKey(name: '_id') this.id,
      this.name,
      @JsonKey(name: 'loc') this.location,
      this.dist,
      this.ptz,
      this.angle,
      this.liveviewUrl});

  factory _$_Camera.fromJson(Map<String, dynamic> json) =>
      _$$_CameraFromJson(json);

  @override
  @JsonKey(name: '_id')
  final String? id;
  @override
  final String? name;
  @override
  @JsonKey(name: 'loc')
  final CameraLocation? location;
  @override
  final String? dist;
  @override
  final bool? ptz;
  @override
  final int? angle;
  @override
  final String? liveviewUrl;

  @override
  String toString({DiagnosticLevel minLevel = DiagnosticLevel.info}) {
    return 'Camera(id: $id, name: $name, location: $location, dist: $dist, ptz: $ptz, angle: $angle, liveviewUrl: $liveviewUrl)';
  }

  @override
  void debugFillProperties(DiagnosticPropertiesBuilder properties) {
    super.debugFillProperties(properties);
    properties
      ..add(DiagnosticsProperty('type', 'Camera'))
      ..add(DiagnosticsProperty('id', id))
      ..add(DiagnosticsProperty('name', name))
      ..add(DiagnosticsProperty('location', location))
      ..add(DiagnosticsProperty('dist', dist))
      ..add(DiagnosticsProperty('ptz', ptz))
      ..add(DiagnosticsProperty('angle', angle))
      ..add(DiagnosticsProperty('liveviewUrl', liveviewUrl));
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_Camera &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.name, name) || other.name == name) &&
            (identical(other.location, location) ||
                other.location == location) &&
            (identical(other.dist, dist) || other.dist == dist) &&
            (identical(other.ptz, ptz) || other.ptz == ptz) &&
            (identical(other.angle, angle) || other.angle == angle) &&
            (identical(other.liveviewUrl, liveviewUrl) ||
                other.liveviewUrl == liveviewUrl));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(
      runtimeType, id, name, location, dist, ptz, angle, liveviewUrl);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_CameraCopyWith<_$_Camera> get copyWith =>
      __$$_CameraCopyWithImpl<_$_Camera>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$_CameraToJson(
      this,
    );
  }
}

abstract class _Camera implements Camera {
  const factory _Camera(
      {@JsonKey(name: '_id') final String? id,
      final String? name,
      @JsonKey(name: 'loc') final CameraLocation? location,
      final String? dist,
      final bool? ptz,
      final int? angle,
      final String? liveviewUrl}) = _$_Camera;

  factory _Camera.fromJson(Map<String, dynamic> json) = _$_Camera.fromJson;

  @override
  @JsonKey(name: '_id')
  String? get id;
  @override
  String? get name;
  @override
  @JsonKey(name: 'loc')
  CameraLocation? get location;
  @override
  String? get dist;
  @override
  bool? get ptz;
  @override
  int? get angle;
  @override
  String? get liveviewUrl;
  @override
  @JsonKey(ignore: true)
  _$$_CameraCopyWith<_$_Camera> get copyWith =>
      throw _privateConstructorUsedError;
}
