part of 'camera_detail_cubit.dart';


@freezed
class CameraDetailStateData with _$CameraDetailStateData {
  const factory CameraDetailStateData({
    @Default(StatusType.init) StatusType? status,
    @Default('') String? error,
    @Default(CameraPosition(target: LatLng(0, 0))) CameraPosition? locationSelectedCamera,
    @Default(PlaceNear(results: [])) PlaceNear? locationSelected,
    }) = _CameraDetailStateData;
}


@freezed
class CameraDetailState with _$CameraDetailState {
  const factory CameraDetailState.initial({CameraDetailStateData?data}) = _Initial;
  const factory CameraDetailState.loading({CameraDetailStateData?data}) = _Loading;
  const factory CameraDetailState.getLocationSelectedCamera({CameraDetailStateData?data}) = _GetLocationSelectedCamera;
  const factory CameraDetailState.error({CameraDetailStateData?data}) = _Error;
}
