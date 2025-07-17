import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:traffic_solution_dsc/core/models/TrafficData/TrafficData.dart';
import 'package:traffic_solution_dsc/core/models/district/district.dart';
import 'package:traffic_solution_dsc/core/models/ward/ward.dart';

class FireBaseDataBase {
  
  static Stream<List<TrafficData>> readReportBySegmentId(String segmentId) =>
      FirebaseFirestore.instance
          .collection('TrafficData')
          .where('SS_ID', isEqualTo: segmentId)
          .snapshots()
          .map((event) =>
              event.docs.map((e) => TrafficData.fromJson(e.data())).toList());
  static Stream<List<District>> readDistrict() => FirebaseFirestore.instance
      .collection('districts')
      .snapshots()
      .map((event) => event.docs.map((e) {
            return District.fromJson(e.data());
          }).toList());
  static Stream<List<Ward>> readAllWard() => FirebaseFirestore.instance
      .collection('wards')
      .snapshots()
      .map((event) => event.docs.map((e) => Ward.fromJson(e.data())).toList());
}
