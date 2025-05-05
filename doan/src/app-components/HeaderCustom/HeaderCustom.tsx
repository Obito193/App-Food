import { useNavigationServices } from "@app-helper/navigateToScreens";
import colors from "@assets/colors/global_colors";
import sizes from "@assets/styles/sizes";
import styles_c from "@assets/styles/styles_c";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, TouchableOpacity, View } from "react-native";

interface HeaderCustomProps {
  title: any
  rightIcon?: React.ReactNode
}
const HeaderCustom: React.FC<HeaderCustomProps> = ({ title, rightIcon }) => {
  const { goToBack } = useNavigationServices()
  return (
    <View style={{ ...styles_c.row_between }}>
      <TouchableOpacity onPress={goToBack} style={{ padding: 10 }}>
        <Ionicons name="arrow-back-outline" size={sizes._25sdp} color={colors.black} />
      </TouchableOpacity>
      <View style={{  ...styles_c.col_center }}>
        <Text style={{ ...styles_c.font_text_18_600, color: colors.black }}>{title}</Text>
      </View>
      <View>
        {rightIcon}
      </View>
    </View>
  )
}
export default HeaderCustom