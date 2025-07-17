import 'package:flutter/material.dart';

import '../../core/constraints/color_palatte.dart';
import '../../core/constraints/dimension_constants.dart';
import '../../core/helper/text_styles.dart';

// ignore: must_be_immutable
class ButtonWidget extends StatelessWidget {
  final String label;
  final Color color;
  final VoidCallback onTap;
  Color? textColor;
  ButtonWidget(
      {super.key,
      required this.label,
      required this.color,
      required this.onTap,
      this.textColor});

  @override
  Widget build(BuildContext context) {
    return InkWell(
      borderRadius: kDefaultBorderRadius,
      onTap: onTap,
      splashColor: Colors.amber,
      child: Container(
        alignment: Alignment.center,
        width: double.infinity,
        decoration:
            BoxDecoration(borderRadius: kDefaultBorderRadius, color: color),
        padding: const EdgeInsets.symmetric(vertical: kDefaultPadding),
        child: Text(
          label,
          style: TextStyles.h6.copyWith(
              color: textColor ?? ColorPalette.blackText,
              fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}
