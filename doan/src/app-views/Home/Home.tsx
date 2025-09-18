import HeaderApp from "@app-components/HeaderApp/HeaderApp"
import SearchBar from "@app-components/SearchBar/SearchBar"
import { Container, Content } from "@app-layout/Layout"
import colors from "@assets/colors/global_colors"
import sizes from "@assets/styles/sizes"
import styles_c from "@assets/styles/styles_c"
import { useEffect, useState } from "react"
import { TouchableOpacity, View } from "react-native"
import Feather from 'react-native-vector-icons/Feather';
import ListProductTabBar from "./components/ListProductTabBar"
import { useNavigationComponentApp } from "@app-helper/navigateToScreens"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@redux/store"
import { getCartData } from "@redux/features/cartSlice"

interface HomeProps { }
const Home: React.FC<HomeProps> = () => {
  const { goToCart } = useNavigationComponentApp()
  const [textSearch, setTextSearch] = useState<string>('')
  const receiveTextSearch = (text: string) => {
    setTextSearch(textSearch)
  }
  const dispatch = useDispatch<AppDispatch>();
  const { hasFetchedCartData } = useSelector((state: RootState) => state.cart, shallowEqual)
  const { tokenData } = useSelector((state: RootState) => state.auth, shallowEqual)
  useEffect(() => {
    if (!hasFetchedCartData && tokenData) {
      dispatch(getCartData(tokenData))
    }
  }, [tokenData, hasFetchedCartData])

  return (
    <Container style={{ backgroundColor: colors.orange_primary, flex: 1 }}>
      <HeaderApp title="Trang chủ" />
      <View style={{ height: sizes._screen_height }}>
        <View style={{ ...styles_c.row_direction_align_center, gap: 8, padding: 10 }}>
          <View style={{width: '90%'}}>
            <SearchBar recieveText={receiveTextSearch} />
          </View>
          <View style={{width: '10%'}}>
             <TouchableOpacity onPress={() => goToCart()}>
            <Feather name='shopping-cart' size={sizes._25sdp} color={colors.white} />
          </TouchableOpacity>
          </View>
        </View>
        <View style={{ backgroundColor: colors?.gray_light }}>
          <ListProductTabBar />
        </View>
      </View>
    </Container>
  )
}
export default Home