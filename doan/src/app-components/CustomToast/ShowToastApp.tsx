import sizes from '@assets/styles/sizes';
import Toast from 'react-native-toast-message';

const showToastApp = ({
  type,
  title,
  text,
  position = 'top',
}: {
  type?: 'success' | 'error' | 'info' | 'tomatoToast';
  title?: string;
  text?: string;
  position?: 'top' | 'bottom';
}) => {
  return Toast.show({
    position: position,
    type: type,
    topOffset: sizes._50sdp,
    bottomOffset: sizes._170sdp,
    keyboardOffset: sizes._70sdp,
    // And I can pass any custom props I want
    text1: title,
    text2: text,
  });
};

export default showToastApp;
