import React, { memo, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import sizes from '@assets/styles/sizes';
import ServiceStorage, { KEY_STORAGE } from '@app-services/service-storage';
import { loginAccount, resetLoginResponse } from '@redux/features/authSlice';
import { AppDispatch, RootState } from '@redux/store';

interface SplashProps {}

const Splash: React.FC<SplashProps> = () => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch<AppDispatch>();

  const { authLoading, authError, loginResponse } = useSelector((state: RootState) => state.auth);

  const getTokenData = async () => {
    const userData = await ServiceStorage.getObject(KEY_STORAGE.ACCOUNT_DATA);

    if (userData?.email && userData?.password) {
      dispatch(loginAccount({ email: userData.email, password: userData.password }));
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })
      );
    }
  };

  useEffect(() => {
    getTokenData();
  }, []);

  useEffect(() => {
    if (loginResponse?.token) {
      (async () => {
        await navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'BottomContainer' }],
          })
        );
      })();
    } else{
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })
      );
    }
    dispatch(resetLoginResponse())
  }, [loginResponse?.token]);

  return (
    <View style={styles.container}>
      <FastImage
        source={require('@assets/images/logoLvalegend.png')}
        style={styles.logo}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.footer}>
        <Text style={styles.footerText}>Product by Hoang Le</Text>
      </View>
    </View>
  );
};

export default memo(Splash);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  logo: {
    width: sizes._100sdp,
    height: sizes._102sdp,
  },
  footer: {
    position: 'absolute',
    bottom: 10,
  },
  footerText: {
    fontSize: sizes._10sdp,
  },
});
