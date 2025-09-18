import HeaderApp from '@app-components/HeaderApp/HeaderApp';
import HeaderCustom from '@app-components/HeaderCustom/HeaderCustom';
import { useNavigationComponentApp } from '@app-helper/navigateToScreens';
import { Container } from '@app-layout/Layout';
import { useRoute } from '@react-navigation/native';
import { getOrderItemsData, resetOrderItemsData } from '@redux/features/orderSlice';
import { AppDispatch, RootState } from '@redux/store';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

const STATUS_STEPS = ['pending', 'processing', 'shipped', 'delivered'];
const STATUS_LABELS: Record<string, string> = {
  pending: 'Chờ xác nhận',
  processing: 'Đang xử lý',
  shipped: 'Đang giao',
  delivered: 'Hoàn thành',
};

const initialOrder = {
  id: 1,
  user_id: 1,
  total_price: '250000',
  payment_status: 'paid',
  order_status: 'pending', // pending | processing | shipped | delivered | cancelled
  address: '123 Nguyễn Trãi, Hà Nội',
  created_at: '2025-09-09T13:20:15.000Z',
};

const orderItems = [
  {
    id: 1,
    name: 'Pizza Phô Mai',
    quantity: 1,
    total_price: '120000',
    price: '120000',
    image: 'https://i.redd.it/yyr6vtruhzbb1.jpg',
    description: 'Pizza đế mỏng phủ phô mai béo ngậy.',
  },
  {
    id: 2,
    name: 'Hamburger bò',
    quantity: 2,
    total_price: '130000',
    price: '65000',
    image: 'https://daynauan.vn/uploads/2015/07/hamburger2.jpg',
    description: 'Hamburger thịt bò nướng, rau sống và phô mai.',
  },
  {
    id: 3,
    name: 'Hamburger bò',
    quantity: 2,
    total_price: '130000',
    price: '65000',
    image: 'https://daynauan.vn/uploads/2015/07/hamburger2.jpg',
    description: 'Hamburger thịt bò nướng, rau sống và phô mai.',
  },
];

const OrderDetail = () => {
  const route = useRoute<any>();
  const { data } = route.params ?? {};

  const [order, setOrder] = useState<any>();
  const currentStepIndex = STATUS_STEPS.indexOf(order?.order_status);
  const dispatch = useDispatch<AppDispatch>();
  const { currentPagePaginationOrderItemsData, hasFetchedPaginationOrderItemsData, hasMorePaginationOrderItemsData, orderError, orderLoading, paginationOrderItemsData } = useSelector((state: RootState) => state.order, shallowEqual)

  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [triggerResetData, setTriggerResetData] = useState<boolean>(false)

  useEffect(() => {
    if (!triggerResetData && data?.id) {
      dispatch(resetOrderItemsData())
      dispatch(getOrderItemsData({ page: 1, limit: 10, filterColumn: 'order_id', filterValue: data?.id }))
      setTriggerResetData(true)
    }
  }, [triggerResetData, data])

  const handleLoadMore = () => {
    if (currentPagePaginationOrderItemsData > 1 && hasMorePaginationOrderItemsData && !orderLoading && data?.id) {
      dispatch(getOrderItemsData({ page: currentPagePaginationOrderItemsData, limit: 10, filterColumn: 'order_id', filterValue: data?.id }))
    }
  }

  const onRefreshData = () => {
    if (!orderLoading) {
      setRefreshing(true)
      setTriggerResetData(false)
      dispatch(resetOrderItemsData())
      setRefreshing(false)
    }
  }

  useEffect(() => {
    if (data) {
      setOrder(data)
    }
  }, [data])

  const handleCancel = () => {
    setOrder({ ...order, order_status: 'cancelled' });
  };

  const handleNextStatus = () => {
    if (currentStepIndex < STATUS_STEPS.length - 1) {
      const nextStatus = STATUS_STEPS[currentStepIndex + 1];
      setOrder({ ...order, order_status: nextStatus });
    }
  };

  return (
    <Container>
      <HeaderCustom title='Chi tiết đơn hàng' />
      <View style={styles.container}>
        {/* Trạng thái đơn hàng */}
        <View style={styles.statusCard}>
          <Text style={styles.sectionTitle}>Trạng thái đơn hàng</Text>
          <View style={styles.progressContainer}>
            {STATUS_STEPS.map((status, index) => {
              const isActive = index <= currentStepIndex;
              return (
                <View key={status} style={styles.progressStep}>
                  <View
                    style={[
                      styles.circle,
                      {
                        backgroundColor:
                          order?.order_status === 'cancelled'
                            ? '#EF4444'
                            : isActive
                              ? '#3B82F6'
                              : '#D1D5DB',
                      },
                    ]}
                  >
                    <Text style={styles.circleText}>{index + 1}</Text>
                  </View>
                  <Text
                    style={[
                      styles.statusLabel,
                      {
                        color:
                          order?.order_status === 'cancelled'
                            ? '#EF4444'
                            : isActive
                              ? '#111827'
                              : '#9CA3AF',
                      },
                    ]}
                  >
                    {STATUS_LABELS[status]}
                  </Text>
                  {index < STATUS_STEPS.length - 1 && (
                    <View
                      style={[
                        styles.line,
                        {
                          backgroundColor:
                            order?.order_status === 'cancelled'
                              ? '#EF4444'
                              : isActive
                                ? '#3B82F6'
                                : '#D1D5DB',
                        },
                      ]}
                    />
                  )}
                </View>
              );
            })}
          </View>
        </View>

        {/* Thông tin đơn hàng */}
        <View style={styles.orderCard}>
          <Text style={styles.sectionTitle}>Thông tin đơn hàng</Text>
          <Text style={styles.infoText}>
            <Text style={styles.label}>Mã đơn: </Text>#{order?.id}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.label}>Địa chỉ: </Text>
            {order?.address}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.label}>Thanh toán: </Text>
            {order?.payment_status === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.label}>Trạng thái: </Text>
            {order?.order_status === 'cancelled'
              ? 'Đã hủy'
              : STATUS_LABELS[order?.order_status]}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.label}>Tổng tiền: </Text>
            <Text style={styles.totalPrice}>{order?.total_price} đ</Text>
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.label}>Ngày đặt: </Text>
            {new Date(order?.created_at).toLocaleString()}
          </Text>
        </View>

        {/* Danh sách sản phẩm */}
        <Text style={styles.sectionTitle}>Sản phẩm</Text>
        <FlatList
          data={paginationOrderItemsData || []}
          keyExtractor={(item, index) => item.id ? item?.id.toString() : index.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.8}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefreshData} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 10 }}
          renderItem={({ item }) => (
            <View style={styles.productCard}>
              <FastImage source={{ uri: item?.image }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{item?.name}</Text>
                <Text style={styles.productDesc}>{item?.description}</Text>
                <Text>Số lượng: {item?.quantity}</Text>
                <Text>Giá: {item.price} đ</Text>
                <Text style={styles.productTotal}>
                  Thành tiền: {item?.total_price} đ
                </Text>
              </View>
            </View>
          )}
        />

        {/* Nút hành động */}
        <View style={styles.actions}>
          {order?.order_status === 'pending' && (
            <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
              <Text style={styles.btnText}>Hủy đơn</Text>
            </TouchableOpacity>
          )}
          {order?.order_status !== 'delivered' &&
            order?.order_status !== 'cancelled' && (
              <TouchableOpacity style={styles.confirmBtn} onPress={handleNextStatus}>
                <Text style={styles.btnText}>Chuyển trạng thái tiếp theo</Text>
              </TouchableOpacity>
            )}
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F9FAFB' },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 },
  statusCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
  },
  progressContainer: { flexDirection: 'row', alignItems: 'center' },
  progressStep: { alignItems: 'center', flex: 1 },
  circle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: { color: '#fff', fontWeight: '700', fontSize: 12 },
  line: { flex: 1, height: 2, marginHorizontal: 4 },
  statusLabel: { fontSize: 12, marginLeft: 4 },
  orderCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
  },
  label: { fontWeight: '600' },
  infoText: { marginBottom: 6, fontSize: 14 },
  totalPrice: { color: '#EF4444', fontWeight: '700' },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 1,
  },
  productImage: { width: 90, height: 90, borderRadius: 12, marginRight: 12 },
  productInfo: { flex: 1 },
  productName: { fontSize: 15, fontWeight: '700' },
  productDesc: { fontSize: 13, color: '#6B7280', marginVertical: 4 },
  productTotal: { fontWeight: '700', color: '#EF4444', marginTop: 4 },
  actions: {
    marginTop: 15,
    flexDirection: 'row',
    marginBottom: 15,
    gap: 5,
  },
  cancelBtn: {
    backgroundColor: '#EF4444',
    paddingVertical: 14,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
  },
  confirmBtn: {
    backgroundColor: '#3B82F6',
    paddingVertical: 14,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
  },
  btnText: { color: '#fff', fontWeight: '600' },
});

export default OrderDetail;
