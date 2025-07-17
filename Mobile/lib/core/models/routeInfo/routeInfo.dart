import 'package:google_maps_flutter/google_maps_flutter.dart';

class RouteInfo {
  final List<LatLng> routePoints;
  final Duration travelTime;
  final double distance; // Tính bằng mét

  RouteInfo({
    required this.routePoints,
    required this.travelTime,
    required this.distance,
  });
}
