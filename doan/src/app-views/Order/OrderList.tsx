import HeaderCustom from "@app-components/HeaderCustom/HeaderCustom";
import { useNavigationComponentApp } from "@app-helper/navigateToScreens";
import { formatDate } from "@app-helper/utilities";
import { Container, Content } from "@app-layout/Layout";
import colors from "@assets/colors/global_colors";
import styles_c from "@assets/styles/styles_c";
import { getOrderListData, resetOrderListData } from "@redux/features/orderSlice";
import { AppDispatch, RootState } from "@redux/store";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, RefreshControl } from "react-native";
import FastImage from "react-native-fast-image";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

interface OrderListProps {
}

const OrderList: React.FC<OrderListProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { goToOrderDetail } = useNavigationComponentApp()
  const { currentPagePaginationOrderListData, hasFetchedPaginationOrderListData, hasMorePaginationOrderListData, orderError, orderLoading, paginationOrderListData } = useSelector((state: RootState) => state.order, shallowEqual)
  const { tokenData } = useSelector((state: RootState) => state.auth, shallowEqual)

  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [triggerResetData, setTriggerResetData] = useState<boolean>(false)

  useEffect(() => {
    if (!hasFetchedPaginationOrderListData && !triggerResetData && tokenData) {
      dispatch(getOrderListData({ page: 1, limit: 10, token: tokenData }))
      setTriggerResetData(true)
    }
  }, [hasFetchedPaginationOrderListData, triggerResetData, tokenData])

  const handleLoadMore = () => {
    if (currentPagePaginationOrderListData > 1 && hasMorePaginationOrderListData && !orderLoading && tokenData) {
      dispatch(getOrderListData({ page: currentPagePaginationOrderListData, limit: 10, token: tokenData }))
    }
  }

  const onRefreshData = () => {
    if (!orderLoading) {
      setRefreshing(true)
      setTriggerResetData(false)
      dispatch(resetOrderListData())
      setRefreshing(false)
    }
  }

  const renderItem = ({ item }: { item: any }) => (
    <View
      style={{
        backgroundColor: "#fff",
        padding: 16,
        marginVertical: 10,
        marginHorizontal: 16,
        borderRadius: 16,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 3,
      }}
    >
      {/* Header */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 12 }}>
        <Text style={{ fontSize: 16, fontWeight: "700", color: "#333" }}>
          Đơn hàng #{item.id}
        </Text>
        <View
          style={{
            backgroundColor: item.payment_status === "paid" ? "#D4F5DD" : "#FFD6D6",
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: "600",
              color: item.payment_status === "paid" ? "green" : "red",
            }}
          >
            {item.payment_status === "paid" ? "Đã thanh toán" : "Chưa thanh toán"}
          </Text>
        </View>
      </View>

      {/* Body */}
      <View style={{ marginBottom: 10 }}>
        <Text style={{ fontSize: 14, color: "#444", marginBottom: 4 }}>
          Tổng tiền:{" "}
          <Text style={{ fontWeight: "600", color: "#E74C3C" }}>
            {(item.total_price)}
          </Text>
        </Text>
        <Text style={{ fontSize: 14, color: "#444", marginBottom: 4 }}>
          Trạng thái:{" "}
          <Text
            style={{
              fontWeight: "600",
              color: item.order_status === "pending" ? "#F39C12" : "#3498DB",
            }}
          >
            {item.order_status}
          </Text>
        </Text>
        <Text style={{ fontSize: 14, color: "#444", marginBottom: 4 }}>
          Địa chỉ: <Text style={{ color: "#555" }}>{item.address}</Text>
        </Text>
        <Text style={{ fontSize: 13, color: "#777" }}>
          Ngày đặt: {formatDate(item.created_at)}
        </Text>
      </View>

      {/* Footer */}
      <TouchableOpacity
        onPress={() => goToOrderDetail({ data: item })}
        style={{
          backgroundColor: "#3498DB",
          paddingVertical: 10,
          borderRadius: 12,
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "600", fontSize: 14 }}>
          Xem chi tiết
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Container>
      <HeaderCustom
        title={'Danh sách đơn hàng của tôi'}
        isShowLeftButton={false}
        containerStyle={{ ...styles_c.col_center, padding: 10 }}
      />
      <View style={{paddingBottom:65}}>
        <FlatList
          data={paginationOrderListData || []}
          keyExtractor={(item, index) => item.id ? item?.id.toString() : index.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.8}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefreshData} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 10 }}
          renderItem={renderItem}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 80,
  },
  orderContainer: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  orderHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  orderDetails: {
    flex: 1,
  },
  orderId: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  productName: {
    fontSize: 14,
    color: "#333",
  },
  quantity: {
    fontSize: 14,
    marginBottom: 4,
  },
  totalPrice: {
    fontSize: 14,
    color: "#e53935",
    marginBottom: 8,
  },
  status: {
    fontSize: 14,
    color: "#333",
    marginBottom: 16,
  },
  button: {
    backgroundColor: colors.orange_primary,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default OrderList;
