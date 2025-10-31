import HeaderApp from "@app-components/HeaderApp/HeaderApp"
import SearchBar from "@app-components/SearchBar/SearchBar"
import { useNavigationComponentApp } from "@app-helper/navigateToScreens"
import { Container, Content } from "@app-layout/Layout"
import colors from "@assets/colors/global_colors"
import sizes from "@assets/styles/sizes"
import styles_c from "@assets/styles/styles_c"
import { useState } from "react"
import { FlatList, Text, TouchableOpacity, View } from "react-native"
import FastImage from "react-native-fast-image"
import Feather from "react-native-vector-icons/Feather"
import allData from '../../data/all.json';

interface SearchProps { }

const Search: React.FC<SearchProps> = () => {
  const { goToCart } = useNavigationComponentApp()
  const [textSearch, setTextSearch] = useState < string > ('')

  const receiveTextSearch = (text: string) => {
    setTextSearch(text)
  }

  // Danh sách chuyên mục đồ ăn
  const foodCategories = [
    'Đồ ăn nhanh',
    'Đồ uống',
    'Ăn vặt'
  ]

  const { goToProductDetail } = useNavigationComponentApp()
  const renderItem = ({ item, index }: { item: any, index: number }) => (
    <TouchableOpacity style={{ width: '45%', margin: 10 }} onPress={() => goToProductDetail({ product: item })}>
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
    <Container style={{ backgroundColor: colors.orange_primary, flex: 1 }}>
      <HeaderApp title="Tìm kiếm" />

      <View style={{ flex: 1 }}>
        {/* Phần trên cố định */}
        <View>
          <View style={{ ...styles_c.row_direction_align_center, gap: 8, padding: 10 }}>
            <View style={{ width: '90%' }}>
              <SearchBar recieveText={receiveTextSearch} />
            </View>
            <View style={{ width: '10%' }}>
              <TouchableOpacity onPress={() => goToCart()}>
                <Feather name='shopping-cart' size={sizes._25sdp} color={colors.white} />
              </TouchableOpacity>
            </View>
          </View>

          {/* <View style={{ backgroundColor: colors.white, paddingHorizontal: 10, paddingVertical: 5, gap:5 }}>
        <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Gợi ý chuyên mục</Text>
        <FlatList
          scrollEnabled={false}
          data={foodCategories}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setTextSearch(item)}
              style={{
                flex: 1,
                margin: 5,
                paddingVertical: 10,
                borderWidth: 1,
                borderColor: colors.gray_medium,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.white,
              }}
            >
              <Text style={{ color: colors.black, textAlign: 'center' }}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View> */}

          {/* Phần dưới scroll */}
          {/* <View style={{ flex: 1, backgroundColor: colors.white }}>
      <View style={{ marginLeft: 10, marginVertical: 10 }}>
        <Text style={{ fontWeight: 'bold', color: colors.black }}>Gợi ý sản phẩm</Text>
      </View>
      <FlatList
        data={allData}
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30, paddingHorizontal: 10, gap: 10 }}
        renderItem={renderItem}
      />
    </View> */}
        </View>
      </View>
    </Container>

  )
}

export default Search
