import sizes from '@assets/styles/sizes';
import {StyleSheet, Text, View} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles_c from '@assets/styles/styles_c';
/*
  1. Create the config
*/
export const toastConfig = {
  /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
  success: ({text1, text2, props}: any) => (
    <View
      style={{
        ...styles.outerContainer,
        borderColor: '#41B870',
      }}>
      <View style={styles.innerContainer}>
        <View style={{...styles.icons}}>
          <Octicons name="check-circle" size={24} color={'#41B870'} />
        </View>
        <View style={{...styles.view_text}}>
          {text1 && (
            <Text style={{...styles.title, color: '#41B870'}}>{text1}</Text>
          )}
          {text2 && (
            <Text numberOfLines={1} style={styles.text}>
              {text2}
            </Text>
          )}
        </View>
      </View>
    </View>
  ),
  /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
  error: ({text1, text2, props}: any) => (
    <View
      style={{
        ...styles.outerContainer,
        borderColor: '#c74243',
      }}>
      <View style={styles.innerContainer}>
        <View style={{...styles.icons}}>
          <MaterialIcons name="error" size={24} color={'#c74243'} />
        </View>
        <View style={{...styles.view_text}}>
          {text1 && (
            <Text style={{...styles.title, color: '#c74243'}}>{text1}</Text>
          )}
          {text2 && (
            <Text numberOfLines={1} style={styles.text}>
              {text2}
            </Text>
          )}
        </View>
      </View>
    </View>
  ),
  /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
  info: ({text1, text2, props}: any) => (
    <View
      style={{
        ...styles.outerContainer,
        backgroundColor: '#474747',
      }}>
      <View style={styles.innerContainer}>
        <View style={{...styles.icons}}>
          <MaterialIcons name="error-outline" size={24} color={'#FFFFFF'} />
        </View>
        <View style={{...styles.view_text}}>
          {text1 && (
            <Text style={{...styles.title, color: '#FFFFFF'}}>{text1}</Text>
          )}
          {text2 && (
            <Text numberOfLines={1} style={{...styles.text, color: '#FFFFFF'}}>
              {text2}
            </Text>
          )}
        </View>
      </View>
    </View>
  ),
  /*
      Or create a completely new type - `tomatoToast`,
      building the layout from scratch.
  
      I can consume any custom `props` I want.
      They will be passed when calling the `show` method (see below)
    */
  tomatoToast: ({text1, props}: any) => (
    <View style={{height: 60, width: '100%', backgroundColor: 'tomato'}}>
      <Text>{text1}</Text>
      <Text>{props.uuid}</Text>
    </View>
  ),
};

const styles = StyleSheet.create({
  outerContainer: {
    ...styles_c.box_shadow,
    borderRadius: 8,
    borderLeftWidth: 8,
    alignItems: 'flex-start',
    width: sizes._screen_width / 1.4,
    backgroundColor: 'white',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  view_text: {
    marginLeft: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  text: {
    ...styles_c.font_text_12_400,
    textAlign: 'center',
  },
  title: {
    ...styles_c.font_text_14_400,
    textAlign: 'center',
  },
  icons: {
    paddingVertical: 10,
  },
});
