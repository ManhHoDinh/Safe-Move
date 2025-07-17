import 'package:flutter/material.dart';

class ColorPalette {
  static const Color backgroundColor = Color(0xffF5F6F9);
  static const Color primaryColor = Color(0xff2E747C);

  static const Color appBarHeaderColor = Color(0xff476A49);

  static const Color lightGreen = Color(0xffE1FFE3);
  static const Color greenText = Color(0xff1BAE76);
  static const Color darkBlueText = Color(0xff22577A);
  static const Color grayText = Color(0xffA2A0A8);
  static const Color blackText = Color(0xff000000);
  static const Color yellowColor = Color(0xffBFBFBF);
  static const Color orangeColor = Color(0xffBFBFBF);
  static const Color bgTextFieldColor = Color(0xffF5F6F9);

  static const Color calendarGround = Color(0xff002270);
  static const Color rankText = Color(0xff808080);
  static const Color infoDetail = Color(0xffA8D7D8);
  static const Color redColor = Color(0xb3E45826);
  static const Color detailBorder = Color(0xff9B9B9B);
  static const Color lateDay = Color(0xffF4E2BB);
  static const Color absentDay = Color(0xffE45826);

  static const Color nearlyWhite = Color(0xFFFAFAFA);
  static const Color white = Color(0xFFFFFFFF);
  static const Color background = Color(0xFFF2F3F8);
  static const Color nearlyDarkBlue = Color(0xFF2633C5);

  static const Color nearlyBlue = Color(0xFF00B6F0);
  static const Color nearlyBlack = Color(0xFF213333);
  static const Color grey = Color(0xFF3A5160);
  static const Color dark_grey = Color(0xFF313A44);

  static const Color darkText = Color(0xFF253840);
  static const Color darkerText = Color(0xFF17262A);
  static const Color lightText = Color(0xFF4A6572);
  static const Color deactivatedText = Color(0xFF767676);
  static const Color dismissibleBackground = Color(0xFF364A54);
  static const Color spacer = Color(0xFFF2F2F2);
}

class Gradients {
  static const Gradient defaultGradientBackground = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomLeft,
    colors: [
      ColorPalette.darkBlueText,
      ColorPalette.primaryColor,
    ],
  );
}
