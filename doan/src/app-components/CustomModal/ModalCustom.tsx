import React, {FC, useState, useRef, useEffect} from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  PanResponder,
  Animated,
  ViewProps,
  ViewStyle,
  StyleProp,
  Dimensions,
  Text,
} from 'react-native';
import sizes from '@assets/styles/sizes';
import {Button} from 'native-base';
import styles_c from '@assets/styles/styles_c';
const screenHeight = Dimensions.get('window').height;

export interface ModalCustomProps {
  iconRightTop?: any;
  isAnimated?: boolean;
  showBtn?: boolean;
  isScroll?: boolean; //true sẽ tắt chức năng vuốt màn hình để closeModal
  isLoading?: boolean;
  isVisible?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  children: React.ReactNode;
  titleBtn1?: String;
  titleBtn2?: String;
  style?: StyleProp<ViewStyle>;
  isDisabled?: boolean;
  title?: String;
}

const ModalCustom: FC<ModalCustomProps> = ({
  iconRightTop,
  isAnimated = true,
  showBtn = true,
  isScroll = false,
  isLoading,
  isVisible,
  onClose,
  onConfirm,
  children,
  titleBtn1,
  titleBtn2,
  style,
  isDisabled,
  title,
}) => {
  const translateY = useRef(new Animated.Value(screenHeight)).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => !isScroll,
    onMoveShouldSetPanResponder: (_, gestureState) =>
      !isScroll && Math.abs(gestureState.dy) > 5,
    onPanResponderMove: (_, gestureState) => {
      if (!isScroll && gestureState.dy > 0) {
        // Chỉ cho phép kéo xuống khi không trong trạng thái cuộn
        translateY.setValue(gestureState.dy);
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      if (!isScroll && gestureState.dy > 100) {
        closeAnimation();
      } else {
        resetPositionAnimation();
      }
    },
  });

  useEffect(() => {
    if (isVisible) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: isAnimated ? 300 : 0,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, translateY, isAnimated]);

  const resetPositionAnimation = () => {
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const closeAnimation = () => {
    Animated.timing(translateY, {
      toValue: screenHeight,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onClose && onClose(); // Đảm bảo gọi onClose sau khi animation hoàn thành
    });
  };

  const animatedStyle = {
    transform: [{translateY: translateY}],
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={{...styles.overlay}}>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={onClose}></TouchableOpacity>
        <Animated.View
          {...panResponder.panHandlers}
          style={[styles.modalView, animatedStyle]}>
          <TouchableOpacity style={{alignItems: 'center'}} onPress={onClose}>
            <View style={styles.Bar} />
          </TouchableOpacity>
          <View
            style={{
              ...styles_c.row_between,
              ...styles_c.border_bottom,
              ...styles_c.view_height_row_bw,
              paddingHorizontal: 16,
            }}>
            <View style={{flex: 1}}></View>
            {title && (
              <View
                style={{
                  alignItems: 'center',
                }}>
                <Text style={{...styles_c.font_text_14_600, color: '#1890FF'}}>
                  {title}
                </Text>
              </View>
            )}
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              {iconRightTop}
            </View>
          </View>
          <View style={{maxHeight: sizes._screen_height * 0.82}}>
            {children}
            {showBtn && (
              <View style={{...styles_c.row_between}}>
                {titleBtn1 && (
                  <View
                    style={{
                      ...styles.view_btn,
                    }}>
                    <Button variant={'outline'} onPress={onClose}>
                      {titleBtn1}
                    </Button>
                  </View>
                )}
                {titleBtn2 && (
                  <View
                    style={{
                      ...styles.view_btn,
                    }}>
                    <Button
                      isDisabled={isDisabled}
                      isLoading={isLoading}
                      onPress={onConfirm}>
                      {titleBtn2}
                    </Button>
                  </View>
                )}
              </View>
            )}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default ModalCustom;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#0000001E',
  },
  modalView: {
    justifyContent: 'flex-end',
    maxHeight: sizes._screen_height * 0.9,
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  Bar: {
    marginTop: 8,
    backgroundColor: '#F1F1F1',
    height: sizes._8sdp,
    width: sizes._80sdp,
    borderRadius: 5,
  },
  flexOne: {
    maxHeight: screenHeight * 0.74,
  },
  view_btn: {
    flex: 1,

    ...styles_c.view_height_center,
    marginVertical: 16,
    marginBottom: 24,
    paddingHorizontal: 16,
    gap: 16,
  },
});
