import sizes from '@assets/styles/sizes';
import {Platform} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  viewTab: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    height: Platform.OS === 'ios' ? sizes._95sdp : sizes._90sdp,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  btnBottom: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: '100%',
  },
  container: {
    backgroundColor: 'tranparent',
    paddingTop: 5,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
});
