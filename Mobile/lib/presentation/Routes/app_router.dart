
import 'package:flutter/material.dart';
import 'package:traffic_solution_dsc/presentation/screens/HomeScreen/HomeScreen.dart';

import '../screens/AuthScreen/login_screen.dart';
import '../screens/AuthScreen/signUp_screen.dart';

final Map<String, WidgetBuilder> routes = {
  HomeScreen.routeName: (context) => HomeScreen(),
  LoginScreen.routeName: (context) => LoginScreen(),
  // SplashScreen.routeName: (context) => SplashScreen(),
  // Onboarding.routeName: (context) => Onboarding(),
  SignUpScreen.routeName: (context) => SignUpScreen(),
  // NavigationHome.routeName: (context) => NavigationHome(),
  // ChooseImageScreen.routeName: (context) => ChooseImageScreen(),
  // ReceiveCertificateScreen.routeName: (context) => ReceiveCertificateScreen(),
  // PutToFloorScreen.routeName: (context) => PutToFloorScreen(),
};