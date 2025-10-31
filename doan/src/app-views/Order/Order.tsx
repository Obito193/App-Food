import { Container } from "@app-layout/Layout";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from "react-native";
import { useState } from "react";
import colors from "@assets/colors/global_colors";
import HeaderCustom from "@app-components/HeaderCustom/HeaderCustom";
import sizes from "@assets/styles/sizes";
import { useNavigationComponentApp } from "@app-helper/navigateToScreens";
import { useRoute } from "@react-navigation/native";
import { formatCurrencyToNumber } from "@app-helper/utilities";
import showToastApp from "@app-components/CustomToast/ShowToastApp";
import FastImage from "react-native-fast-image";

const Order: React.FC = () => {
  const route = useRoute<any>();
  const { products, type } = route.params ?? { products: [] }; // mảng sản phẩm
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [payment_method_data, setPaymentMethodData]= useState( { label: "Thanh toán khi nhận hàng", value: "COD" });
  const { goToOrderInfo } = useNavigationComponentApp();

  console.log('products', products)

  // lưu số lượng cho từng sản phẩm
  const [quantities, setQuantities] = useState<{ [key: number]: number }>(
    products?.reduce((acc: any, p: any) => {
      acc[p.id] = p.quantity ?? 1;
      return acc;
    }, {})
  );

  const handleIncrease = (id: number) => {
    setQuantities((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const handleDecrease = (id: number) => {
    if (quantities[id] > 1) {
      setQuantities((prev) => ({ ...prev, [id]: prev[id] - 1 }));
    }
  };

  const totalPrice = products.reduce((sum: number, p: any) => {
    const price = formatCurrencyToNumber(p.price); // "120.000đ" -> 120000
    const qty = quantities[p.id] ?? 1;
    return sum + price * qty;
  }, 0);


  const handlePlaceOrder = () => {
    if (!address) {
      showToastApp({
        type: "error",
        text: "Bạn chưa nhập địa chỉ giao hàng",
      });
      return;
    }

    const items = products?.map((p: any) => ({
      ...p,
      quantity: quantities[p.id],
      total_price: formatCurrencyToNumber(p.price) * quantities[p.id],
      product_id: type == 'cart' ? [p.product_id] : [p.id]
    }));

    const data = {
      total_price: formatCurrencyToNumber(totalPrice),
      order_status: "pending",
      payment_method: payment_method_data,
      address,
      items,
    };
    goToOrderInfo({ data });
  };

  const paymentMethods = [
    { label: "Thanh toán khi nhận hàng", value: "COD" },
    { label: "Chuyển khoản ngân hàng", value: "BankTransfer" },
    { label: "Thanh toán qua ví điện tử", value: "EWallet" },
  ];

  return (
    <Container>
      <HeaderCustom
        title={"Tạo đơn hàng"}
        rightIcon={<View style={{ flex: 1 }}></View>}
      />
      <View>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Địa chỉ giao hàng */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Địa chỉ giao hàng</Text>
            <TextInput
              placeholder="Nhập địa chỉ giao hàng"
              style={styles.input}
              value={address}
              onChangeText={setAddress}
            />
          </View>

          {/* Danh sách sản phẩm */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thông tin sản phẩm</Text>
            {products.map((product: any) => (
              <View style={styles.productContainer} key={product.id}>
                <FastImage
                  source={{ uri: product.image }}
                  style={styles.productImage}
                />
                <View style={styles.productDetails}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productPrice}>
                    {product.price.toLocaleString()} đ
                  </Text>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      onPress={() => handleDecrease(product.id)}
                      style={styles.quantityButton}
                    >
                      <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>
                      {quantities[product.id]}
                    </Text>
                    <TouchableOpacity
                      onPress={() => handleIncrease(product.id)}
                      style={styles.quantityButton}
                    >
                      <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* Tổng tiền */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tổng tiền</Text>
            <Text style={styles.totalText}>{totalPrice.toLocaleString()} đ</Text>
          </View>

          {/* Phương thức thanh toán */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
            <View style={styles.paymentOptions}>
              {paymentMethods.map((method) => (
                <TouchableOpacity
                  key={method.value}
                  style={[
                    styles.paymentOption,
                    paymentMethod === method.value &&
                    styles.paymentOptionSelected,
                  ]}
                  onPress={() => {setPaymentMethod(method.value), setPaymentMethodData(method)}}
                >
                  <Text
                    style={[
                      styles.paymentOptionText,
                      paymentMethod === method.value &&
                      styles.paymentOptionTextSelected,
                    ]}
                  >
                    {method.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Chi tiết thanh toán */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Chi tiết thanh toán</Text>
            <Text>- Tổng cộng: {totalPrice.toLocaleString()} đ</Text>
          </View>
        </ScrollView>

        {/* Nút Đặt hàng */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.orderButton}
            onPress={handlePlaceOrder}
          >
            <Text style={styles.orderButtonText}>Đặt hàng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 150,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: "#f9f9f9",
  },
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 14,
    color: "#e53935",
    marginVertical: 8,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 12,
  },
  totalText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#e53935",
  },
  paymentOptions: {
    flexDirection: "column",
    gap: 10,
  },
  paymentOption: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#f9f9f9",
  },
  paymentOptionSelected: {
    backgroundColor: colors.orange_primary,
    borderColor: colors.orange_primary,
  },
  paymentOptionText: {
    fontSize: 14,
    color: "#333",
  },
  paymentOptionTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    bottom: sizes._60sdp,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  orderButton: {
    backgroundColor: colors.orange_primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  orderButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Order;
