import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:traffic_solution_dsc/presentation/screens/CameraScreen/CameraDetail.dart';
import 'package:traffic_solution_dsc/presentation/screens/HomeScreen/cubit/home_cubit.dart';

import '../../../core/models/camera/camera.dart';

class CameraScreen extends StatefulWidget {
  const CameraScreen({Key? key}) : super(key: key);
  static String routeName = "/CameraScreen";
  static Page page() => const MaterialPage<void>(child: CameraScreen());
  @override
  CameraScreenState createState() => CameraScreenState();
  static MultiBlocProvider provider() {
    return MultiBlocProvider(
      providers: [
        BlocProvider<HomeCubit>(
          create: (BuildContext context) => HomeCubit(),
        ),
      ],
      child: const CameraScreen(),
    );
  }
}

class CameraScreenState extends State<CameraScreen> {
  List<Camera> cameras = [];
  List<Camera> allCameras = [];

  Future<void> _loadCameras() async {
    List<Camera> fetchCameras = await context.read<HomeCubit>().fetchCameras();
    if (!mounted) return;
    setState(() {
      cameras = fetchCameras;
      allCameras = cameras;
    });
  }

  String? district;
  TextEditingController searchController = TextEditingController();
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    _loadCameras();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Traffic Camera / Ho Chi Minh"),
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 0),
            alignment: Alignment.center,
            child: TextFormField(
              controller: searchController,
              decoration: InputDecoration(
                contentPadding:
                    const EdgeInsets.symmetric(horizontal: 20.0, vertical: 0),
                hintText: "Tìm kiếm",
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(10.0),
                ),
              ),
              onChanged: (value) {
                setState(() {
                  cameras = allCameras
                      .where((element) =>
                          element.dist == district ||
                          district == 'Tất cả quận' ||
                          district == null)
                      .where((element) =>
                          element.name!.contains(searchController.text))
                      .toList();
                });
              },
            ),
          ),
          Container(
            width: 180,
            margin:
                const EdgeInsets.symmetric(horizontal: 20.0, vertical: 10.0),
            padding: const EdgeInsets.symmetric(horizontal: 10.0, vertical: 0),
            decoration: BoxDecoration(
              border: Border.all(color: Colors.black),
              borderRadius: BorderRadius.circular(10.0),
            ),
            child: DropdownButton<String>(
              style: TextStyle(color: Colors.greenAccent),
              focusColor: Colors.greenAccent,
              underline: Container(),
              isExpanded: true,
              items: <String>[
                'Tất cả quận',
                'Quận 1',
                'Quận 2',
                'Quận 3',
                'Quận 4',
                'Quận 5',
                'Quận 6',
                'Quận 7',
                'Quận 8',
                'Quận 9',
                'Quận 10',
                'Quận 11',
                'Quận 12',
                'Quận Bình Tân',
                'Quận Bình Thạnh',
                'Quận Gò Vấp',
                'Quận Phú Nhuận',
                'Quận Tân Bình',
                'Quận Tân Phú',
                'Quận Thủ Đức',
                'Huyện Bình Chánh',
                'Huyện Cần Giờ',
                'Huyện Củ Chi',
                'Huyện Hóc Môn',
                'Huyện Nhà Bè'
              ].map((String value) {
                return DropdownMenuItem<String>(
                  value: value,
                  child: Text(value, style: TextStyle(color: Colors.black)),
                );
              }).toList(),
              onChanged: (value) {
                setState(() {
                  district = value;
                  cameras = allCameras
                      .where((element) =>
                          element.dist == district ||
                          district == 'Tất cả quận' ||
                          district == null)
                      .where((element) =>
                          element.name!.contains(searchController.text))
                      .toList();
                });
              },
              borderRadius: BorderRadius.circular(10.0),
              hint: Text(district ?? 'Tất cả quận'),
            ),
          ),
          Expanded(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: ListView.builder(
                itemCount: cameras.length,
                itemBuilder: (context, index) {
                  return Container(
                    margin: const EdgeInsets.symmetric(vertical: 10),
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.all(Radius.circular(10)),
                      color: Colors.white,
                    ),
                    child: InkWell(
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) =>
                                CameraDetailScreen(cameraData: cameras[index]),
                          ),
                        );
                        ;
                      },
                      child: ListTile(
                        leading: Image.network(
                          cameras[index].liveviewUrl ?? "http://giaothong.hochiminhcity.gov.vn/render/ImageHandler.ashx?id=${cameras[index].id}",
                          width: 80,
                          fit: BoxFit.cover,
                        ),
                        title: Text(cameras[index].name ?? ''),
                        subtitle: Text(cameras[index].dist ?? ''),
                        trailing: Icon(
                          Icons.circle,
                          color: Colors.green,
                          size: 12,
                        ),
                      ),
                    ),
                  );
                },
              ),
            ),
          ),
          SizedBox(height: 80),
        ],
      ),
    );
  }
}
