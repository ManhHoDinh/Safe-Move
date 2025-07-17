import 'package:flutter/material.dart';

import '../../core/helper/assets_helper.dart';

class TabIconData {
  TabIconData({
    this.imagePath = '',
    this.index = 0,
    this.selectedImagePath = '',
    this.isSelected = false,
    this.animationController,
  });

  String imagePath;
  String selectedImagePath;
  bool isSelected;
  int index;

  AnimationController? animationController;

  static List<TabIconData> tabIconsList = <TabIconData>[
    TabIconData(
      imagePath: AssetHelper.icoTab1,
      selectedImagePath: AssetHelper.icoTab1s,
      index: 0,
      isSelected: true,
      animationController: null,
    ),
    TabIconData(
      imagePath: AssetHelper.icoTab2,
      selectedImagePath: AssetHelper.icoTab2s,
      index: 1,
      isSelected: false,
      animationController: null,
    ),
    TabIconData(
      imagePath: AssetHelper.icoTab3,
      selectedImagePath: AssetHelper.icoTab3s,
      index: 2,
      isSelected: false,
      animationController: null,
    ),
    TabIconData(
      imagePath: AssetHelper.icoTab4,
      selectedImagePath: AssetHelper.icoTab4s,
      index: 3,
      isSelected: false,
      animationController: null,
    ),
  ];
}
