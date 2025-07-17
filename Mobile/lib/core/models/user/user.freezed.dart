// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'user.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

UserModel _$UserModelFromJson(Map<String, dynamic> json) {
  return _UserModel.fromJson(json);
}

/// @nodoc
mixin _$UserModel {
  String get Id => throw _privateConstructorUsedError;
  String get Name => throw _privateConstructorUsedError;
  String get PhoneNumber => throw _privateConstructorUsedError;
  String get Email => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $UserModelCopyWith<UserModel> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $UserModelCopyWith<$Res> {
  factory $UserModelCopyWith(UserModel value, $Res Function(UserModel) then) =
      _$UserModelCopyWithImpl<$Res, UserModel>;
  @useResult
  $Res call({String Id, String Name, String PhoneNumber, String Email});
}

/// @nodoc
class _$UserModelCopyWithImpl<$Res, $Val extends UserModel>
    implements $UserModelCopyWith<$Res> {
  _$UserModelCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? Id = null,
    Object? Name = null,
    Object? PhoneNumber = null,
    Object? Email = null,
  }) {
    return _then(_value.copyWith(
      Id: null == Id
          ? _value.Id
          : Id // ignore: cast_nullable_to_non_nullable
              as String,
      Name: null == Name
          ? _value.Name
          : Name // ignore: cast_nullable_to_non_nullable
              as String,
      PhoneNumber: null == PhoneNumber
          ? _value.PhoneNumber
          : PhoneNumber // ignore: cast_nullable_to_non_nullable
              as String,
      Email: null == Email
          ? _value.Email
          : Email // ignore: cast_nullable_to_non_nullable
              as String,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$_UserModelCopyWith<$Res> implements $UserModelCopyWith<$Res> {
  factory _$$_UserModelCopyWith(
          _$_UserModel value, $Res Function(_$_UserModel) then) =
      __$$_UserModelCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({String Id, String Name, String PhoneNumber, String Email});
}

/// @nodoc
class __$$_UserModelCopyWithImpl<$Res>
    extends _$UserModelCopyWithImpl<$Res, _$_UserModel>
    implements _$$_UserModelCopyWith<$Res> {
  __$$_UserModelCopyWithImpl(
      _$_UserModel _value, $Res Function(_$_UserModel) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? Id = null,
    Object? Name = null,
    Object? PhoneNumber = null,
    Object? Email = null,
  }) {
    return _then(_$_UserModel(
      Id: null == Id
          ? _value.Id
          : Id // ignore: cast_nullable_to_non_nullable
              as String,
      Name: null == Name
          ? _value.Name
          : Name // ignore: cast_nullable_to_non_nullable
              as String,
      PhoneNumber: null == PhoneNumber
          ? _value.PhoneNumber
          : PhoneNumber // ignore: cast_nullable_to_non_nullable
              as String,
      Email: null == Email
          ? _value.Email
          : Email // ignore: cast_nullable_to_non_nullable
              as String,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$_UserModel with DiagnosticableTreeMixin implements _UserModel {
  const _$_UserModel(
      {required this.Id,
      required this.Name,
      required this.PhoneNumber,
      required this.Email});

  factory _$_UserModel.fromJson(Map<String, dynamic> json) =>
      _$$_UserModelFromJson(json);

  @override
  final String Id;
  @override
  final String Name;
  @override
  final String PhoneNumber;
  @override
  final String Email;

  @override
  String toString({DiagnosticLevel minLevel = DiagnosticLevel.info}) {
    return 'UserModel(Id: $Id, Name: $Name, PhoneNumber: $PhoneNumber, Email: $Email)';
  }

  @override
  void debugFillProperties(DiagnosticPropertiesBuilder properties) {
    super.debugFillProperties(properties);
    properties
      ..add(DiagnosticsProperty('type', 'UserModel'))
      ..add(DiagnosticsProperty('Id', Id))
      ..add(DiagnosticsProperty('Name', Name))
      ..add(DiagnosticsProperty('PhoneNumber', PhoneNumber))
      ..add(DiagnosticsProperty('Email', Email));
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_UserModel &&
            (identical(other.Id, Id) || other.Id == Id) &&
            (identical(other.Name, Name) || other.Name == Name) &&
            (identical(other.PhoneNumber, PhoneNumber) ||
                other.PhoneNumber == PhoneNumber) &&
            (identical(other.Email, Email) || other.Email == Email));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(runtimeType, Id, Name, PhoneNumber, Email);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_UserModelCopyWith<_$_UserModel> get copyWith =>
      __$$_UserModelCopyWithImpl<_$_UserModel>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$_UserModelToJson(
      this,
    );
  }
}

abstract class _UserModel implements UserModel {
  const factory _UserModel(
      {required final String Id,
      required final String Name,
      required final String PhoneNumber,
      required final String Email}) = _$_UserModel;

  factory _UserModel.fromJson(Map<String, dynamic> json) =
      _$_UserModel.fromJson;

  @override
  String get Id;
  @override
  String get Name;
  @override
  String get PhoneNumber;
  @override
  String get Email;
  @override
  @JsonKey(ignore: true)
  _$$_UserModelCopyWith<_$_UserModel> get copyWith =>
      throw _privateConstructorUsedError;
}
