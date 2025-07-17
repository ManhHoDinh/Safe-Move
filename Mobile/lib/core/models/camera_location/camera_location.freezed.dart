// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'camera_location.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

CameraLocation _$CameraLocationFromJson(Map<String, dynamic> json) {
  return _CameraLocation.fromJson(json);
}

/// @nodoc
mixin _$CameraLocation {
  String? get type => throw _privateConstructorUsedError;
  List<double>? get coordinates => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $CameraLocationCopyWith<CameraLocation> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $CameraLocationCopyWith<$Res> {
  factory $CameraLocationCopyWith(
          CameraLocation value, $Res Function(CameraLocation) then) =
      _$CameraLocationCopyWithImpl<$Res, CameraLocation>;
  @useResult
  $Res call({String? type, List<double>? coordinates});
}

/// @nodoc
class _$CameraLocationCopyWithImpl<$Res, $Val extends CameraLocation>
    implements $CameraLocationCopyWith<$Res> {
  _$CameraLocationCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? type = freezed,
    Object? coordinates = freezed,
  }) {
    return _then(_value.copyWith(
      type: freezed == type
          ? _value.type
          : type // ignore: cast_nullable_to_non_nullable
              as String?,
      coordinates: freezed == coordinates
          ? _value.coordinates
          : coordinates // ignore: cast_nullable_to_non_nullable
              as List<double>?,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$_CameraLocationCopyWith<$Res>
    implements $CameraLocationCopyWith<$Res> {
  factory _$$_CameraLocationCopyWith(
          _$_CameraLocation value, $Res Function(_$_CameraLocation) then) =
      __$$_CameraLocationCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({String? type, List<double>? coordinates});
}

/// @nodoc
class __$$_CameraLocationCopyWithImpl<$Res>
    extends _$CameraLocationCopyWithImpl<$Res, _$_CameraLocation>
    implements _$$_CameraLocationCopyWith<$Res> {
  __$$_CameraLocationCopyWithImpl(
      _$_CameraLocation _value, $Res Function(_$_CameraLocation) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? type = freezed,
    Object? coordinates = freezed,
  }) {
    return _then(_$_CameraLocation(
      type: freezed == type
          ? _value.type
          : type // ignore: cast_nullable_to_non_nullable
              as String?,
      coordinates: freezed == coordinates
          ? _value._coordinates
          : coordinates // ignore: cast_nullable_to_non_nullable
              as List<double>?,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$_CameraLocation
    with DiagnosticableTreeMixin
    implements _CameraLocation {
  const _$_CameraLocation({this.type, final List<double>? coordinates})
      : _coordinates = coordinates;

  factory _$_CameraLocation.fromJson(Map<String, dynamic> json) =>
      _$$_CameraLocationFromJson(json);

  @override
  final String? type;
  final List<double>? _coordinates;
  @override
  List<double>? get coordinates {
    final value = _coordinates;
    if (value == null) return null;
    if (_coordinates is EqualUnmodifiableListView) return _coordinates;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(value);
  }

  @override
  String toString({DiagnosticLevel minLevel = DiagnosticLevel.info}) {
    return 'CameraLocation(type: $type, coordinates: $coordinates)';
  }

  @override
  void debugFillProperties(DiagnosticPropertiesBuilder properties) {
    super.debugFillProperties(properties);
    properties
      ..add(DiagnosticsProperty('type', 'CameraLocation'))
      ..add(DiagnosticsProperty('type', type))
      ..add(DiagnosticsProperty('coordinates', coordinates));
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_CameraLocation &&
            (identical(other.type, type) || other.type == type) &&
            const DeepCollectionEquality()
                .equals(other._coordinates, _coordinates));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(
      runtimeType, type, const DeepCollectionEquality().hash(_coordinates));

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_CameraLocationCopyWith<_$_CameraLocation> get copyWith =>
      __$$_CameraLocationCopyWithImpl<_$_CameraLocation>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$_CameraLocationToJson(
      this,
    );
  }
}

abstract class _CameraLocation implements CameraLocation {
  const factory _CameraLocation(
      {final String? type,
      final List<double>? coordinates}) = _$_CameraLocation;

  factory _CameraLocation.fromJson(Map<String, dynamic> json) =
      _$_CameraLocation.fromJson;

  @override
  String? get type;
  @override
  List<double>? get coordinates;
  @override
  @JsonKey(ignore: true)
  _$$_CameraLocationCopyWith<_$_CameraLocation> get copyWith =>
      throw _privateConstructorUsedError;
}
