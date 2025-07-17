import 'dart:convert';

import 'package:bloc/bloc.dart';
import 'package:flutter/foundation.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:http/http.dart' as http;
import 'dart:convert' as convert;

import '../../../../core/models/search/map_box_suggest.dart';

part 'search_state.dart';
part 'search_cubit.freezed.dart';

class SearchCubit extends Cubit<SearchState> {
  SearchCubit() : super(SearchState.initial());
  void search(String text) async {
    try {
      emit(SearchState.loading());

      // Định nghĩa các tham số cho API suggest
      final params = {
        'q': text,
        'language': 'en', // Bạn có thể thay đổi ngôn ngữ nếu cần
        'country': 'vn',
        'proximity': '-74.03577818913537,40.75701713735819', // Tọa độ gần
        'session_token': '0d1aad32-41f5-4bc1-8940-ccfe27e04859', // Token phiên
        'access_token':
            'pk.eyJ1IjoibWFuaGhvZGluaCIsImEiOiJjbGxuaWpyZTMwMHVtM2VuMTdnc29mZWR1In0.xbj1J-Vq2UqbLSVCL0fe9Q',
      };

      // Tạo URL với các tham số truy vấn
      final url = Uri.https(
        'api.mapbox.com',
        '/search/searchbox/v1/suggest',
        params,
      );

      // Gửi yêu cầu GET đến API
      final res = await http.get(url);

      // Kiểm tra mã trạng thái HTTP
      if (res.statusCode == 200) {
        // Phân tích cú pháp JSON
        print(res.body);
        final MapBoxSuggestResponse response =
            MapBoxSuggestResponse.fromJson(jsonDecode(res.body));
        print(response);
        // Kiểm tra nếu không có kết quả
        if (response.suggestions.isEmpty) {
          emit(SearchState.error("Không tìm thấy kết quả"));
        } else {
          emit(SearchState.loaded(response.suggestions));
          print(response.suggestions);
        }
      } else {
        emit(SearchState.error("Lỗi: ${res.statusCode} - ${res.reasonPhrase}"));
      }
    } catch (e) {
      emit(SearchState.error("Lỗi: ${e.toString()}"));
    }
  }

  Future<LatLng?> retrieveFeature(String id) async {
    try {
      final params = {
        'session_token': '0bbc9533-a4ad-4991-8940-defdc420dc95',
        'access_token':
            'pk.eyJ1IjoibWFuaGhvZGluaCIsImEiOiJjbGxuaWpyZTMwMHVtM2VuMTdnc29mZWR1In0.xbj1J-Vq2UqbLSVCL0fe9Q',
      };

      final url =
          Uri.parse('https://api.mapbox.com/search/searchbox/v1/retrieve/$id')
              .replace(queryParameters: params);

      final res = await http.get(url);
      final status = res.statusCode;
      print(res);
      if (status == 200) {
        var json = convert.jsonDecode(res.body);
        return LatLng(json['features'][0]['geometry']['coordinates'][1],
            json['features'][0]['geometry']['coordinates'][0]);
      } else {
        return null;
      }
    } catch (e) {
      return null;
    }
  }
}
