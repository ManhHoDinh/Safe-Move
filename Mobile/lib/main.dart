import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:traffic_solution_dsc/core/helper/AuthFunctions.dart';
import 'package:traffic_solution_dsc/core/helper/app_colors.dart';
import 'package:traffic_solution_dsc/core/services/firebase_options.dart';
import 'package:traffic_solution_dsc/notification_service.dart';
import 'package:traffic_solution_dsc/presentation/screens/splash/splash_screen.dart';

import 'presentation/Routes/app_router.dart';
import 'presentation/screens/AuthScreen/login_screen.dart';
import 'presentation/screens/HomeScreen/cubit/home_cubit.dart';
import 'presentation/screens/MainScreen/bottom_navigation_home.dart';

bool firstTimeUser = true;
void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  
  NotificationService notificationService = NotificationService();
  await notificationService.initialize();

  runApp(SafeMoveApp());
}

class SafeMoveApp extends StatefulWidget {
  const SafeMoveApp({super.key});

  @override
  State<SafeMoveApp> createState() => _SafeMoveAppState();
}

class _SafeMoveAppState extends State<SafeMoveApp> {
  var auth = FirebaseAuth.instance;
  bool isLogin = false;

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Safe Move',
      theme: ThemeData(
        primaryColor: AppColors.primary,
        scaffoldBackgroundColor: AppColors.contentColorWhite,
      ),
      home: AuthenticationWrapper(),
      routes: routes,
      debugShowCheckedModeBanner: false,
    );
  }
}

class AuthenticationWrapper extends StatefulWidget {
  const AuthenticationWrapper({super.key});

  @override
  AuthenticationWrapperState createState() => AuthenticationWrapperState();
}

class AuthenticationWrapperState extends State<AuthenticationWrapper> {
  bool _showSplash = true;

  @override
  void initState() {
    super.initState();
    // Wait for 5 seconds and then hide the splash screen
    Future.delayed(Duration(seconds: 3), () {
      setState(() {
        _showSplash = false;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return _showSplash
        ? SplashScreen()
        : StreamBuilder<User?>(
            stream: FirebaseAuth.instance.authStateChanges(),
            builder: (BuildContext context, AsyncSnapshot<User?> snapshot) {
              if (snapshot.connectionState == ConnectionState.waiting) {
                return SplashScreen();
              } else {
                if (snapshot.hasData) {
                  return FutureBuilder(
                    future: AuthServices.UpdateCurrentUser(),
                    builder:
                        (BuildContext context, AsyncSnapshot<void> snapshot) {
                      if (snapshot.connectionState == ConnectionState.waiting) {
                        // Show a loading indicator if necessary
                        return SplashScreen();
                      } else {
                        // If the update is complete, navigate to the MainScreen
                        return Provider<HomeCubit>(
                          create: (_) => HomeCubit(),
                          builder: (context, child) {
                            return BottomHomeScreen(); // Chạy MapSample trong phạm vi Provider
                          },
                        );
                      }
                    },
                  );
                } else {
                  //return Onboarding();
                  return LoginScreen();
                }
              }
            },
          );
  }
}
