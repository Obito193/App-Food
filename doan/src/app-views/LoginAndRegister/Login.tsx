import AppLoading from "@app-components/AppLoading/AppLoading";
import ButtonBase from "@app-components/ButtonBase/ButtonBase";
import { useNavigationMainApp, useNavigationServices } from "@app-helper/navigateToScreens";
import sizes from "@assets/styles/sizes";
import styles_c from "@assets/styles/styles_c";
import { loginAccount, resetLoginResponse } from "@redux/features/authSlice";
import { AppDispatch, RootState } from "@redux/store";
import FastImage from 'react-native-fast-image';
import { Formik } from "formik";
import { Fragment, memo, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { CheckBox } from '@rneui/base';
import { loginSchema } from "./schema/validationForm";
import colors from "@assets/colors/global_colors";

interface LoginProps { }

const Login: React.FC<LoginProps> = () => {
  const [isChecked, setChecked] = useState(false);
  const { goToRegister } = useNavigationMainApp();
 const {replaceScreen} = useNavigationServices()
 const loginResponse = useSelector((state: RootState) => state.auth.loginResponse)
  const dispatch = useDispatch<AppDispatch>();
  

  const [formData, setFormData] = useState({
    email: 'an@gmail.com',
    password: '123456',
  });



  useEffect(() => {
    if (loginResponse?.success == true) {
      replaceScreen('BottomContainer');
    }
  }, [loginResponse]);

  const handleTextChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitForm = () => {
    const isValid = Object.values(formData).every(value => value.trim() !== '');
    if (isValid) {
      dispatch(resetLoginResponse())
      dispatch(loginAccount(formData));
    }
  };
console.log('loginResponse', loginResponse)

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={() => { }}
        >
          {({
            handleChange,
            handleBlur,
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginHorizontal: 15, gap: 12 }}>
              <FastImage
                source={require('@assets/images/logoLvalegend.png')}
                style={{ width: sizes._80sdp, height: sizes._82sdp }}
                resizeMode={FastImage.resizeMode.cover}
              />
              <Text style={{ fontSize: sizes._15sdp,color: colors?.text_orange }}>
                Order Food
              </Text>
              <Text style={{ fontSize: sizes._20sdp , color: colors?.text_orange}}>
                Sign in to your account
              </Text>

              <View style={{ width: '90%', gap: 20 }}>
                {/* Email */}
                <View style={{ gap: 2 }}>
                  <Text>Email</Text>
                  <TextInput
                    style={[styles.text_input_style, errors.email ? styles.errorBorder : null]}
                    placeholder="Enter Email"
                    value={formData.email}
                    onChangeText={(text) => { handleTextChange('email', text); setFieldValue('email', text); }}
                    onBlur={() => handleBlur('email')}
                  />
                  {errors.email && (
                    <Text style={styles.errorText}>
                      {errors.email}
                    </Text>
                  )}
                </View>

                {/* Password */}
                <View style={{ gap: 2 }}>
                  <Text>Password</Text>
                  <TextInput
                    style={[styles.text_input_style, errors.password ? styles.errorBorder : null]}
                    placeholder="Enter Password"
                    secureTextEntry
                    value={formData.password}
                    onChangeText={(text) => { handleTextChange('password', text); setFieldValue('password', text); }}
                    onBlur={() => handleBlur('password')}
                  />
                  {errors.password && (
                    <Text style={styles.errorText}>
                      {errors.password}
                    </Text>
                  )}
                </View>

                {/* Checkbox + Forgot password */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <CheckBox
                    title="Remember me"
                    checked={isChecked}
                    onPress={() => setChecked(!isChecked)}
                    containerStyle={{ padding: 0, margin: 0 }}
                  />
                  <TouchableOpacity onPress={() => { }}>
                    <Text style={{ fontSize: sizes._11sdp, color: colors?.text_orange, fontWeight: '500' }}>
                      Forgot your password?
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Sign In button */}
                <ButtonBase 
                title="Sign In" 
                paddingHorizontal={10}
                paddingVertical={10}
                backgroundColor={colors?.orange_primary}
                // onPress={() => replaceScreen('BottomContainer')}
                onPress={handleSubmitForm}
                 />

                {/* Sign up */}
                <View style={[styles_c.row_center, { gap: 5 }]}>
                  <Text style={{ fontSize: sizes._13sdp }}>
                    You don't have an account?
                  </Text>
                  <TouchableOpacity onPress={goToRegister}>
                    <Text style={{ fontSize: sizes._13sdp,  color: colors?.text_orange, fontWeight: 'bold' }}>
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
      {/* <Fragment>
        {authLoading && <AppLoading loading={authLoading} />}
      </Fragment> */}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  text_input_style: {
    width: '100%',
    padding: 9,
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: 'white',
  },
  errorText: {
    color: '#FF0707',
    fontSize: sizes._10sdp,
    marginTop: 2,
  },
  errorBorder: {
    borderColor: 'red',
    borderWidth: 1,
  },
});

export default Login;
