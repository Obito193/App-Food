import { useOnEventCallback } from '@app-helper/hooks';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { find } from 'lodash';
import React from 'react';
import { Platform, SafeAreaView, View } from 'react-native';
import BottomTab from './BottomTab';
import styles from './NavigationBottom.styles';
import EStyleSheet from 'react-native-extended-stylesheet';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

import sizes from '@assets/styles/sizes';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

EStyleSheet.build({
  $mainColor: '#3498db', // Define your main color here
  // Define other variables here if needed
  $brandSecondary: 'black'
});

enum MainTab {
  Home = 'Trang chủ',
  Order = 'Đơn hàng',
  Search = 'Tìm kiếm',
  Personal = 'Cá nhân',
}

const Tabs = [
  {
    name: MainTab.Home,
    screen: require('@app-views/Home/Home')
      .default,
    icon: (color: any) => <Entypo name='home' color={color} size={sizes._24sdp} />
  },
  {
    name: MainTab.Search,
    screen: require('@app-views/Search/Search')
      .default,
    icon: (color: any) => <AntDesign name='search1' color={color} size={sizes._24sdp} />
  },
  {
    name: MainTab.Order,
    screen: require('@app-views/Order/OrderList')
      .default,
    icon: (color: any) => <Ionicons name='receipt-outline' color={color} size={sizes._24sdp} />
  },
  {
    name: MainTab.Personal,
    screen: require('@app-views/Personal/Personal')
      .default,
    icon: (color: any) => <AntDesign name='user' color={color} size={sizes._24sdp} />
  },
];
type Props = {
  route: any;
  navigation: any;
};
const BottomTabs: React.FC<Props> = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const initialScreenName = route?.params?.screenName || MainTab.Home;

  const CustomTabar = useOnEventCallback((props: BottomTabBarProps) => {
    const { descriptors, navigation, state } = props;
    return (
      <View
        style={{
          borderRadius: 50,
          height: Platform.OS === 'ios' ? 85 : 70,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          backgroundColor: '#fff',
        }}>
        <View style={styles.container}>
          <SafeAreaView style={styles.viewTab}>
            {state.routes.map((route, index) => {
              const { options } = descriptors[route.key];
              const screen_name = route.name as MainTab;
              const tab = find(Tabs, ['name', screen_name]);

              const isFocused = state.index === index;

              const onPress = () => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              };
              const onLongPress = () => {
                navigation.emit({
                  type: 'tabLongPress',
                  target: route.key,
                });
              };
              const color = isFocused
                ? EStyleSheet.value('$mainColor')
                : 'black';

              return (
                <BottomTab
                  key={route.key}
                  icon={tab?.icon(color)}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  isActive={isFocused}
                  onLongPress={onLongPress}
                  onPress={onPress}
                  index={index}
                  name={route.name}
                />
              );
            })}
          </SafeAreaView>
        </View>
      </View>
    );
  });

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={initialScreenName}
      tabBar={CustomTabar}>
      {Tabs.map(screen => {
        return (
          <Tab.Screen
            key={screen.name}
            name={screen.name}
            component={screen.screen}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default BottomTabs;
