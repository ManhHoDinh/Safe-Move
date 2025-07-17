import 'dart:convert';

import 'package:google_maps_flutter/google_maps_flutter.dart';

// Lớp mô hình cho phản hồi từ API suggest
class MapBoxSuggestResponse {
  final List<Suggestion> suggestions;
  final String attribution;
  final String responseId;
  final String url;

  MapBoxSuggestResponse({
    required this.suggestions,
    required this.attribution,
    required this.responseId,
    required this.url,
  });

  factory MapBoxSuggestResponse.fromJson(Map<String, dynamic> json) {
    var suggestionsJson = json['suggestions'] as List;
    List<Suggestion> suggestionsList =
        suggestionsJson.map((e) => Suggestion.fromJson(e)).toList();

    return MapBoxSuggestResponse(
      suggestions: suggestionsList,
      attribution: json['attribution'] ?? '',
      responseId: json['response_id'] ?? '',
      url: json['url'] ?? '',
    );
  }
}

// Lớp mô hình cho mỗi suggestion
class Suggestion {
  final String? name;
  final String? mapboxId;
  final String? featureType;
  final String? address;
  final String? fullAddress;
  final String? placeFormatted;
  final Context? context;
  final String? language;
  final String? maki;
  final List<String>? poiCategory;
  final List<String>? poiCategoryIds;
  final ExternalIds? externalIds;
  final Map<String, dynamic>? metadata;
  final int? distance;
  final String? operationalStatus;
  LatLng? latLng;
  Suggestion({
    this.name,
    this.mapboxId,
    this.featureType,
    this.address,
    this.fullAddress,
    this.placeFormatted,
    this.context,
    this.language,
    this.maki,
    this.poiCategory,
    this.poiCategoryIds,
    this.externalIds,
    this.metadata,
    this.distance,
    this.operationalStatus,
  });

  factory Suggestion.fromJson(Map<String, dynamic> json) {
    return Suggestion(
      name: json['name'],
      mapboxId: json['mapbox_id'],
      featureType: json['feature_type'],
      address: json['address'],
      fullAddress: json['full_address'],
      placeFormatted: json['place_formatted'],
      context:
          json['context'] != null ? Context.fromJson(json['context']) : null,
      language: json['language'],
      maki: json['maki'],
      poiCategory: json['poi_category'] != null
          ? List<String>.from(json['poi_category'])
          : null,
      poiCategoryIds: json['poi_category_ids'] != null
          ? List<String>.from(json['poi_category_ids'])
          : null,
      externalIds: json['external_ids'] != null
          ? ExternalIds.fromJson(json['external_ids'])
          : null,
      metadata: json['metadata'] != null ? json['metadata'] : null,
      distance: json['distance'],
      operationalStatus: json['operational_status'],
    );
  }
}

// Các lớp phụ trợ
class Context {
  final Country? country;
  final Postcode? postcode;
  final Place? place;
  final Neighborhood? neighborhood;
  final Street? street;

  Context({
    this.country,
    this.postcode,
    this.place,
    this.neighborhood,
    this.street,
  });

  factory Context.fromJson(Map<String, dynamic> json) {
    return Context(
      country:
          json['country'] != null ? Country.fromJson(json['country']) : null,
      postcode:
          json['postcode'] != null ? Postcode.fromJson(json['postcode']) : null,
      place: json['place'] != null ? Place.fromJson(json['place']) : null,
      neighborhood: json['neighborhood'] != null
          ? Neighborhood.fromJson(json['neighborhood'])
          : null,
      street: json['street'] != null ? Street.fromJson(json['street']) : null,
    );
  }
}

class Country {
  final String? name;
  final String? countryCode;
  final String? countryCodeAlpha3;

  Country({
    this.name,
    this.countryCode,
    this.countryCodeAlpha3,
  });

  factory Country.fromJson(Map<String, dynamic> json) {
    return Country(
      name: json['name'],
      countryCode: json['country_code'],
      countryCodeAlpha3: json['country_code_alpha_3'],
    );
  }
}

class Postcode {
  final String? id;
  final String? name;

  Postcode({
    this.id,
    this.name,
  });

  factory Postcode.fromJson(Map<String, dynamic> json) {
    return Postcode(
      id: json['id'],
      name: json['name'],
    );
  }
}

class Place {
  final String? id;
  final String? name;

  Place({
    this.id,
    this.name,
  });

  factory Place.fromJson(Map<String, dynamic> json) {
    return Place(
      id: json['id'],
      name: json['name'],
    );
  }
}

class Neighborhood {
  final String? id;
  final String? name;

  Neighborhood({
    this.id,
    this.name,
  });

  factory Neighborhood.fromJson(Map<String, dynamic> json) {
    return Neighborhood(
      id: json['id'],
      name: json['name'],
    );
  }
}

class Street {
  final String? name;

  Street({
    this.name,
  });

  factory Street.fromJson(Map<String, dynamic> json) {
    return Street(
      name: json['name'],
    );
  }
}

class ExternalIds {
  final String? dataplor;

  ExternalIds({
    this.dataplor,
  });

  factory ExternalIds.fromJson(Map<String, dynamic> json) {
    return ExternalIds(
      dataplor: json['dataplor'],
    );
  }
}
