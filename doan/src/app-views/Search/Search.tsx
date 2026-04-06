import HeaderApp from "@app-components/HeaderApp/HeaderApp";
import SearchBar from "@app-components/SearchBar/SearchBar";
import { useNavigationComponentApp } from "@app-helper/navigateToScreens";
import { Container } from "@app-layout/Layout";
import colors from "@assets/colors/global_colors";
import sizes from "@assets/styles/sizes";
import styles_c from "@assets/styles/styles_c";
import { useState, useEffect } from "react";
import { FlatList, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import FastImage from "react-native-fast-image";
import Feather from "react-native-vector-icons/Feather";
import useCallAPI from "@app-helper/useCallAPI";
import URL_API from "@app-helper/urlAPI";
import { TextInput } from 'react-native';

const PAGE_SIZE = 6;

// mapping category
const categoryMap: Record<string, string> = {
  "Đồ ăn nhanh": "fast_food",
  "Đồ uống": "drinks",
  "Ăn vặt": "snacks"
};

const Search = () => {
  const { goToCart, goToProductDetail } = useNavigationComponentApp();

  const [textSearch, setTextSearch] = useState('');
  const [categorySearch, setCategorySearch] = useState<string | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const foodCategories = ['Đồ ăn nhanh', 'Đồ uống', 'Ăn vặt'];

  // CALL API
  const getDataFilter = async (reset = false) => {
    if (loading || (!hasMore && !reset)) return;

    setLoading(true);
    try {
      const currentPage = reset ? 1 : page;

      const dataPayload: any = {
        table: 'product',
        page: currentPage,
        limit: PAGE_SIZE
      };

      // chọn category hay textSearch
      if (categorySearch) {
        dataPayload.field = 'category';
        dataPayload.query = categorySearch;
      } else {
        dataPayload.field = 'name';
        dataPayload.query = textSearch || '';
      }

      const response: any = await useCallAPI({
        method: 'POST',
        url: `${URL_API}search`,
        data: dataPayload,
        showToast: false
      });

      const newData = response?.data || [];

      if (reset) {
        setProducts(newData);
        setPage(2);
      } else {
        setProducts(prev => [...prev, ...newData]);
        setPage(prev => prev + 1);
      }

      setHasMore(newData.length === PAGE_SIZE);

    } catch (error) {
      console.log('ERROR SEARCH:', error);
    } finally {
      setLoading(false);
    }
  };

  // SEARCH TEXT CHANGE → reset category và dữ liệu
  useEffect(() => {
    setCategorySearch(null); // reset category nếu search text
    const delay = setTimeout(() => getDataFilter(true), 400);
    return () => clearTimeout(delay);
  }, [textSearch]);

  // CATEGORY CHANGE → reset data
  useEffect(() => {
    if (categorySearch) getDataFilter(true);
  }, [categorySearch]);

  // LOAD MORE
  const handleLoadMore = () => {
    if (!loading && hasMore) getDataFilter();
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={{ width: '45%', margin: 10 }}
      onPress={() => goToProductDetail({ product: item })}
    >
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

  return (
  <Container style={{ flex: 1, backgroundColor: colors.gray_light }}>
    
    {/* HEADER */}
    <View
      style={{
        backgroundColor: colors.orange_primary,
        paddingTop: sizes._20sdp,
        paddingBottom: sizes._15sdp,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
      }}
    >
      <View style={{ ...styles_c.row_direction_align_center, justifyContent: 'space-between' }}>
        <HeaderApp title="Tìm kiếm" />

        <TouchableOpacity
          onPress={goToCart}
          style={{
            backgroundColor: colors.white,
            padding: 10,
            borderRadius: 50,
            elevation: 4,
          }}
        >
          <Feather name="shopping-cart" size={20} color={colors.orange_primary} />
        </TouchableOpacity>
      </View>

      {/* SEARCH INPUT CUSTOM */}
      <View
        style={{
          marginTop: 12,
          backgroundColor: colors.white,
          borderRadius: 12,
          paddingHorizontal: 12,
          paddingVertical: 8,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Feather name="search" size={18} color={colors.gray_primary} />
        <TextInput
          placeholder="Tìm món ăn..."
          value={textSearch}
          onChangeText={setTextSearch}
          style={{ marginLeft: 8, flex: 1 }}
        />
      </View>
    </View>

    {/* CATEGORY */}
    <View style={{ marginTop: 10 }}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={foodCategories}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        renderItem={({ item }) => {
          const isActive = categorySearch === categoryMap[item];
          return (
            <TouchableOpacity
              onPress={() => setCategorySearch(categoryMap[item])}
              style={{
                paddingVertical: 8,
                paddingHorizontal: 14,
                marginRight: 8,
                borderRadius: 20,
                backgroundColor: isActive ? colors.orange_primary : colors.white,
                elevation: 2,
              }}
            >
              <Text
                style={{
                  color: isActive ? colors.white : colors.gray_primary,
                  fontWeight: '500',
                }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>

    {/* LIST */}
    <FlatList
      data={products}
      keyExtractor={(item, index) => item.id?.toString() || index.toString()}
      numColumns={2}
      renderItem={renderItem}
      contentContainerStyle={{
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 30,
      }}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        loading ? (
          <ActivityIndicator size="small" color={colors.orange_primary} />
        ) : null
      }
    />
  </Container>
);
};

export default Search;