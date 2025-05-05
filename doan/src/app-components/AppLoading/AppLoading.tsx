import React, {useMemo, useRef, useState} from 'react';
import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';
import {Dialog} from '@rneui/themed';
import sizes from '@assets/styles/sizes';

interface AppLoadingProps {
  loading: boolean;
}
const AppLoading: React.FC<AppLoadingProps> = ({loading}) => {
  const [is_loading, setIsLoading] = useState(false);

  useMemo(() => {
    setIsLoading(loading);
  }, [loading]);

  return (
    <Dialog
      isVisible={is_loading}
      onBackdropPress={() => {
        setIsLoading(!is_loading);
      }}
      overlayStyle={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        width: sizes._50sdp,
        height: sizes._50sdp,
      }}>
      <ActivityIndicator
        animating={true}
        size="large"
        color={'white'}
      />
    </Dialog>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIndicatorWrapper: {
    padding: 20,
    borderRadius: 10,
  },
});

export default AppLoading;
