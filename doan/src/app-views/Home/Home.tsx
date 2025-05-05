import HeaderApp from "@app-components/HeaderApp/HeaderApp"
import SearchBar from "@app-components/SearchBar/SearchBar"
import { Container, Content } from "@app-layout/Layout"
import colors from "@assets/colors/global_colors"
import sizes from "@assets/styles/sizes"
import styles_c from "@assets/styles/styles_c"
import { useState } from "react"
import { TouchableOpacity, View } from "react-native"
import Feather from 'react-native-vector-icons/Feather';
import ListProductTabBar from "./components/ListProductTabBar"
import { useNavigationComponentApp } from "@app-helper/navigateToScreens"

interface HomeProps { }
const Home: React.FC<HomeProps> = () => {
  const {goToCart} = useNavigationComponentApp()
  const [textSearch, setTextSearch] = useState<string>('')
  const receiveTextSearch = (text: string) => {
    setTextSearch(textSearch)
  }
  return (
    <Container style={{ backgroundColor: colors.orange_primary, flex:1 }}>
      <HeaderApp title="Trang chủ" />
     <Content style={{ height: sizes._screen_height}} scrollEnabled={false}>
       <View style={{ ...styles_c.row_direction_align_center, gap: 8,padding:10 }}>
        <SearchBar recieveText={receiveTextSearch} />
        <TouchableOpacity onPress={() => goToCart()}>
          <Feather name='shopping-cart' size={sizes._25sdp} color={colors.white} />
        </TouchableOpacity>
      </View>
      <View style={{backgroundColor: colors?.gray_light}}>
       <ListProductTabBar/>
      </View>
     </Content>
    </Container>
  )
}
export default Home