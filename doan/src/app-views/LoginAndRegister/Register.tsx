import ButtonBase from "@app-components/ButtonBase/ButtonBase";
import sizes from "@assets/styles/sizes";
import styles_c from "@assets/styles/styles_c";
import { Fragment, memo, useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { Formik } from "formik";
import { registerSchema } from "./schema/validationForm";
import { useNavigationMainApp, useNavigationServices } from "@app-helper/navigateToScreens";
import { useDispatch, useSelector } from "react-redux";
import AppLoading from "@app-components/AppLoading/AppLoading";
import { registerAccount, resetRegisterResponse } from "@redux/features/authSlice";
import { RootState } from "@redux/store";
import FastImage from "react-native-fast-image";
import colors from "@assets/colors/global_colors";

interface RegisterProps { }

const Register: React.FC<RegisterProps> = () => {
  const { goToLogin, goToBottomContainer } = useNavigationMainApp();
  const {replaceScreen} = useNavigationServices()
  const dispatch = useDispatch();
  const { registerResponse, authLoading } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    user_name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (registerResponse?.success === true) {
      replaceScreen('BottomContainer')
    }
  }, [registerResponse]);

  const handleTextChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitForm = () => {
    const isValid = Object.values(formData).every(value => value.trim() !== '');
    if (isValid) {
      dispatch(resetRegisterResponse())
      dispatch(registerAccount(formData));
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, marginVertical: 20 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
          }}
          validationSchema={registerSchema}
          onSubmit={() => { }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <View style={{ flex: 1, marginHorizontal: 15, justifyContent: 'center', alignItems: 'center', gap: 12 }}>
              <FastImage
                source={require('@assets/images/logoLvalegend.png')}
                style={{ width: sizes._80sdp, height: sizes._82sdp }}
                resizeMode={FastImage.resizeMode.cover}
              />
              <Text style={{ fontSize: sizes._12sdp,color: colors?.text_orange }}>
                Welcome to Food App
              </Text>
              <Text style={{ fontSize: sizes._20sdp,color: colors?.text_orange }}>
                Create your account
              </Text>

              <View style={{ width: '90%', gap: 10 }}>
                {/* Name Field */}
                <View style={{ gap: 2 }}>
                  <Text style={{ color: errors.name ? 'red' : 'black' }}>Name</Text>
                  <TextInput
                    style={[styles.text_input_style, errors.name && { borderColor: 'red', borderWidth: 1 }]}
                    placeholder="Enter Name"
                    value={formData.user_name}
                    onChangeText={(text) => { handleTextChange('user_name', text); setFieldValue('name', text); }}
                    onBlur={() => handleBlur('name')}
                  />
                  {errors.name && (
                    <Text style={{ color: '#FF0707', fontSize: sizes._10sdp }}>
                      {errors.name}
                    </Text>
                  )}
                </View>

                {/* Email Field */}
                <View style={{ gap: 2 }}>
                  <Text>Email</Text>
                  <TextInput
                    style={[styles.text_input_style, errors.email && { borderColor: 'red', borderWidth: 1 }]}
                    placeholder="Enter Email"
                    value={formData.email}
                    onChangeText={(text) => { handleTextChange('email', text); setFieldValue('email', text); }}
                    onBlur={() => handleBlur('email')}
                  />
                  {errors.email && (
                    <Text style={{ color: '#FF0707', fontSize: sizes._10sdp }}>
                      {errors.email}
                    </Text>
                  )}
                </View>

                {/* Password Field */}
                <View style={{ gap: 2 }}>
                  <Text>Password</Text>
                  <TextInput
                    style={[styles.text_input_style, errors.password && { borderColor: 'red', borderWidth: 1 }]}
                    placeholder="Enter Password"
                    value={formData.password}
                    secureTextEntry
                    onChangeText={(text) => { handleTextChange('password', text); setFieldValue('password', text); }}
                    onBlur={() => handleBlur('password')}
                  />
                  {errors.password && (
                    <Text style={{ color: '#FF0707', fontSize: sizes._10sdp }}>
                      {errors.password}
                    </Text>
                  )}
                </View>

                {/* Sign Up Button */}
                <View style={{ marginTop: 5, gap: 22 }}>
                  <ButtonBase
                    title="Sign Up"
                    paddingHorizontal={10}
                    paddingVertical={10}
                    backgroundColor={colors?.orange_primary}
                    onPress={handleSubmitForm}
                  />

                  <View style={[styles_c.row_center, { gap: 5 }]}>
                    <Text style={{ fontSize: sizes._13sdp }}>
                      Do you have an account?
                    </Text>
                    <TouchableOpacity onPress={goToLogin}>
                      <Text style={{ fontSize: sizes._13sdp,  color: colors?.text_orange, fontWeight: 'bold' }}>
                        Sign In
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
      <Fragment>
        {authLoading && <AppLoading loading={authLoading} />}
      </Fragment>
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
});

export default memo(Register);
