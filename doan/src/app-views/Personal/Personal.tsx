import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import HeaderApp from '@app-components/HeaderApp/HeaderApp';
import { Container, Content } from '@app-layout/Layout';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Nếu bạn dùng Expo
import { LOGOAPP } from '@app-uikits/image';
import colors from '@assets/colors/global_colors';
import { useNavigationComponentApp, useNavigationServices } from '@app-helper/navigateToScreens';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@redux/store';
import { resetAllAuth } from '@redux/features/authSlice';
import FastImage from 'react-native-fast-image';

interface PersonalProps { }

const Personal: React.FC<PersonalProps> = () => {
  const { replaceScreen } = useNavigationServices();
  const {goToOrderList} = useNavigationComponentApp()
  const dispatch = useDispatch<AppDispatch>()
  const onPressData = () => {
    dispatch(resetAllAuth())
    replaceScreen('Login')
  }
  const menuOptions = [
    { id: '1', icon: 'person-circle-outline', title: 'Thông tin tài khoản' },
    { id: '2', icon: 'receipt-outline', title: 'Đơn hàng của tôi', press: () => goToOrderList()  },
    { id: '3', icon: 'cart', title: 'Giỏ hàng của tôi' },
    { id: '4', icon: 'location-outline', title: 'Địa chỉ giao hàng' },
    { id: '5', icon: 'settings-outline', title: 'Cài đặt' },
    { id: '6', icon: 'log-out-outline', title: 'Đăng xuất', press: () => onPressData() },
  ];
  
  
  const handleOptionPress = (title: string) => {
    console.log('Bạn chọn:', title);
    // Thêm điều hướng tại đây nếu cần
  };

  return (
    <Container style={{ backgroundColor: colors.orange_primary }}>
      {/* <HeaderApp title="Cá nhân" /> */}
      <Content style={{backgroundColor: colors.white }}>
        <View style={styles.profileContainer}>
          <FastImage
            source={LOGOAPP}
            style={styles.avatar}
          />
          <Text style={styles.username}>Nguyễn Văn A</Text>
        </View>
        <View>
          <FlatList
            data={menuOptions}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.menuItem}
                onPress={item?.press}
              >
                <Ionicons name={item.icon as any} size={22} color="#333" style={{ marginRight: 12 }} />
                <Text style={styles.menuText}>{item.title}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    marginTop:2,
    borderBottomWidth: 2,
    borderTopWidth :2,
    borderColor: colors.gray_medium,
     backgroundColor: colors.orange_primary
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    backgroundColor: '#ccc',
  },
  username: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderColor: '#f0f0f0',
  },
  menuText: {
    fontSize: 16,
  },
});

export default Personal;
