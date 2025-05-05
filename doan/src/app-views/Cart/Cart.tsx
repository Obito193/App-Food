import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import HeaderCustom from '@app-components/HeaderCustom/HeaderCustom';
import { Container, Content, Footer } from '@app-layout/Layout';
import { CheckBox } from '@rneui/base';
import colors from '@assets/colors/global_colors';
import FastImage from 'react-native-fast-image';
import { useNavigationComponentApp } from '@app-helper/navigateToScreens';
import sizes from '@assets/styles/sizes';
import snacksData from '../../data/snacks.json';
import styles_c from '@assets/styles/styles_c';

interface ProductInCart {
  id: number;
  name: string;
  price: number;
  quantity: number;
  selected: boolean;
  image: string;
}

const initialCart: ProductInCart[] = [
  {
    id: 1,
    name: 'Áo thun',
    price: 200000,
    quantity: 1,
    selected: false,
    image: 'https://daynauan.vn/uploads/2015/07/hamburger2.jpg',
  },
  {
    id: 2,
    name: 'Quần jean',
    price: 350000,
    quantity: 2,
    selected: false,
    image: 'https://daynauan.vn/uploads/2015/07/hamburger2.jpg',
  },
];

const Cart: React.FC = () => {
  const {goToProductDetail} = useNavigationComponentApp()
  const renderItem = ({ item, index }: { item: any, index: number }) => (
    <TouchableOpacity style={{ width: '45%', margin: 10 }} onPress={()=> goToProductDetail({product: item})}>
      <View style={{ padding: 10, backgroundColor: '#fff', borderRadius: 8, elevation: 3 }}>
        <FastImage
          source={{ uri: item.image }}
          style={{ width: '100%', height: sizes._160sdp, borderRadius: 8 }}
        />
        <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 8 }}>
          {item.name}
        </Text>
        <Text style={{ color: '#888', marginVertical: 4 }}>
          {item.description}
        </Text>
        <Text style={{ color: '#e67e22', fontWeight: '600' }}>
          {item.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
  const [cartItems, setCartItems] = useState<ProductInCart[]>(initialCart);

  const toggleSelection = (id: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const changeQuantity = (id: number, quantity: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const increaseQuantity = (id: number) => {
    const item = cartItems.find(p => p.id === id);
    if (item) changeQuantity(id, item.quantity + 1);
  };

  const decreaseQuantity = (id: number) => {
    const item = cartItems.find(p => p.id === id);
    if (item && item.quantity > 1) changeQuantity(id, item.quantity - 1);
  };

  return (
    <Container>
      <HeaderCustom title="Giỏ hàng" />
      <Content>
      <View style={{padding:10}}>
          <Text style={{...styles_c.font_text_16_600}}>Sản phẩm đã chọn</Text>
        </View>
        <FlatList
          data={cartItems}
          keyExtractor={item => item.id.toString()}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <CheckBox
                checked={item.selected}
                onPress={() => toggleSelection(item.id)}
                containerStyle={styles.checkbox}
              />
              <FastImage source={{ uri: item.image }} style={styles.image} />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>{item.price.toLocaleString()} đ</Text>
              </View>

              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => decreaseQuantity(item.id)} style={styles.quantityButton}>
                  <Text style={styles.quantityText}>-</Text>
                </TouchableOpacity>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={item.quantity.toString()}
                  onChangeText={text => {
                    const num = parseInt(text) || 1;
                    changeQuantity(item.id, num);
                  }}
                />
                <TouchableOpacity onPress={() => increaseQuantity(item.id)} style={styles.quantityButton}>
                  <Text style={styles.quantityText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
        <View style={{padding:10}}>
          <Text style={{...styles_c.font_text_16_600}}>Gợi ý sản phẩm</Text>
        </View>
        <View style={{ flex: 1, padding: 5, paddingBottom: 30 }}>
          <FlatList
            data={snacksData}
            keyExtractor={(item, index) => item.id ? item?.id.toString() : index.toString()}
            numColumns={2}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ gap: 10 }}
            renderItem={renderItem}
          />
        </View>
      </Content>
      <Footer>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Đặt hàng ngay</Text>
        </TouchableOpacity>
      </Footer>
    </Container>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  checkbox: {
    padding: 0,
    marginRight: 6,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
  },
  price: {
    fontSize: 14,
    color: colors.red_pattel,
    fontWeight: '600'
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  quantityButton: {
    width: 28,
    height: 28,
    backgroundColor: '#ddd',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    width: 40,
    height: 28,
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 4,
    textAlign: 'center',
    borderRadius: 4,
    paddingVertical: 0,
    paddingHorizontal: 4,
  },
  button: {
    backgroundColor: "#e67e22",
    padding: 12,
    margin:20,
    marginBottom:30,
    borderRadius: 10,
    alignItems: "center",

  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600"
  }
});

export default Cart;
