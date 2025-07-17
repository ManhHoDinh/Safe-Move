import 'package:flutter/material.dart';
import 'package:traffic_solution_dsc/core/constraints/dimension_constants.dart';
import 'package:traffic_solution_dsc/core/helper/text_styles.dart';
import 'package:traffic_solution_dsc/presentation/screens/AuthScreen/signUp_screen.dart';
import '../../../core/constraints/color_palatte.dart';
import '../../../core/helper/AuthFunctions.dart';
import '../../../core/helper/assets_helper.dart';
import '../../../core/helper/image_helper.dart';
import '../../widgets/button_widget.dart';
import '../../widgets/input_widget.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});
  static final String routeName = 'login_screen';

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  TextEditingController _emailController = TextEditingController();
  TextEditingController _passwordController = TextEditingController();
  bool _passwordVisible = false;
  final formSignInKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: GestureDetector(
        onTap: () {
          FocusManager.instance.primaryFocus?.unfocus();
        },
        child: SafeArea(
            child: SingleChildScrollView(
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 35, vertical: 20),
            child: Form(
              key: formSignInKey,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    alignment: Alignment.center,
                    padding: const EdgeInsets.only(bottom: 20),
                    child: Image.asset(AssetHelper.safeMoveLogo),
                  ),
                  Text("Welcome back!",
                      style:
                          TextStyles.h2.copyWith(fontWeight: FontWeight.bold)),
                  SizedBox(height: 10),
                  Text(
                    "Login to your account",
                    style: TextStyles.h4.copyWith(color: ColorPalette.grayText),
                  ),
                  SizedBox(height: 20),
                  InputWidget(
                      controller: _emailController,
                      labelText: 'Email',
                      icon: AssetHelper.icoEmail,
                      validator: (input) {
                        final bool emailValid = RegExp(
                                r"[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
                            .hasMatch(input!);
                        if (input.isEmpty) {
                          return "Enter email, please!";
                        } else if (!emailValid) {
                          return "Email is not exist!";
                        }
                      }),
                  SizedBox(
                    height: 30,
                  ),
                  TextFormField(
                    validator: (input) {
                      if (input == "") {
                        return "Enter your password, please!";
                      } else if (input != null && input.length <= 6) {
                        return "Password is too short!";
                      } else
                        return null;
                    },
                    keyboardType: TextInputType.text,
                    obscureText: !_passwordVisible,
                    controller: _passwordController,
                    decoration: InputDecoration(
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10),
                        borderSide: BorderSide(
                          color: ColorPalette.bgTextFieldColor,
                        ),
                      ),
                      suffixIcon: IconButton(
                        icon: Icon(
                          // Based on passwordVisible state choose the icon
                          _passwordVisible
                              ? Icons.visibility
                              : Icons.visibility_off,
                        ),
                        onPressed: () {
                          setState(() {
                            _passwordVisible = !_passwordVisible;
                          });
                        },
                      ),
                      labelText: 'Password',
                      labelStyle:
                          TextStyles.h6.setColor(ColorPalette.blackText),
                      contentPadding: const EdgeInsets.only(bottom: 14),
                      floatingLabelBehavior: FloatingLabelBehavior.never,
                      prefixIcon: Container(
                        child: Image.asset(
                          AssetHelper.icoLock,
                          color: Colors.black,
                        ),
                        padding: const EdgeInsets.only(right: 20, left: 20),
                      ),
                      prefixIconConstraints: BoxConstraints(
                        minWidth: 24,
                      ),
                    ),
                  ),
                  SizedBox(
                    height: 10,
                  ),
                  Container(
                    alignment: Alignment.centerRight,
                    child: TextButton(
                      onPressed: () {},
                      child: Text("Forgot password?",
                          textAlign: TextAlign.right,
                          style: TextStyles.h6
                              .copyWith(color: ColorPalette.primaryColor)),
                    ),
                  ),
                  SizedBox(
                    height: 10,
                  ),
                  ButtonWidget(
                    label: 'Log in',
                    color: ColorPalette.primaryColor,
                    textColor: Colors.white,
                    onTap: () async {
                      if (formSignInKey.currentState!.validate()) {}
                      await AuthServices.signInUser(_emailController.text,
                          _passwordController.text, context);
                    },
                  ),
                  SizedBox(
                    height: 20,
                  ),
                  InkWell(
                    borderRadius: kDefaultBorderRadius,
                    onTap: () async {
                      await AuthServices.signInWithGoogle(context);
                    },
                    splashColor: Colors.blueAccent,
                    child: Container(
                      alignment: Alignment.center,
                      width: double.infinity,
                      decoration: BoxDecoration(
                          borderRadius: kDefaultBorderRadius,
                          border: Border.all(color: Colors.black)),
                      padding: const EdgeInsets.symmetric(vertical: 13),
                      child: Row(
                        children: [
                          Container(
                            child: ImageHelper.loadFromAsset(
                                AssetHelper.icoGoogle,
                                height: 22,
                                width: 22),
                            padding: const EdgeInsets.only(right: 30, left: 30),
                          ),
                          Text(
                            "Continue with Google",
                            style: TextStyles.h6.copyWith(
                                color: ColorPalette.blackText,
                                fontWeight: FontWeight.bold),
                          ),
                        ],
                      ),
                    ),
                  ),
                  SizedBox(
                    height: 10,
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        "Don’t have an account yet?",
                        style: TextStyles.h6.setColor(ColorPalette.grayText),
                      ),
                      TextButton(
                          onPressed: () {
                            Navigator.pushNamed(
                                context, SignUpScreen.routeName);
                          },
                          child: Text("Sign up",
                              style: TextStyles.h6
                                  .setColor(ColorPalette.primaryColor)))
                    ],
                  ),
                ],
              ),
            ),
          ),
        )),
      ),
    );
  }
}
