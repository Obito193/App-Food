import React from 'react';
import { TouchableWithoutFeedback, View, Text, Platform } from 'react-native';
import styles from './NavigationBottom.styles';
import EStyleSheet from 'react-native-extended-stylesheet';
import styles_c from '@assets/styles/styles_c';
import sizes from '@assets/styles/sizes';

interface TabProps {
  isActive?: boolean;
  accessibilityLabel?: string;
  icon?: any;
  onPress?: () => void;
  onLongPress?: () => void;
  index?: any;
  name?: string;
}

EStyleSheet.build({
  $mainColor: '#FF7622',
  $brandSecondary: 'black'
});

const BottomTab: React.FC<TabProps> = ({
  isActive,
  accessibilityLabel,
  icon,
  onLongPress,
  onPress,
  index,
  name,
}) => {
  return (
    <TouchableWithoutFeedback
      accessibilityRole="button"
      accessibilityState={isActive ? { selected: true } : {}}
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}>
      <View style={styles.btnBottom}>
        <View
          style={{
            height: sizes._20sdp,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {isActive && (
            <Text
              style={{
                color: EStyleSheet.value('$mainColor'),
                fontSize: 20,
              }}>
              •
            </Text>
          )}
        </View>
        <View style={{ marginBottom: 9 }}>{icon}</View>
        <View style={{ marginBottom: 8 }}>
          <Text
            style={{
              color: isActive ? EStyleSheet.value('$mainColor') : 'black',
              fontSize: sizes._12sdp,
              fontWeight: '500',
            }}>
            {name}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default BottomTab;
