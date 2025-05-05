import sizes from "@assets/styles/sizes";
import { FlatList, Text, TouchableOpacity, View } from "react-native"
import fastFoodData from '../../../data/fast_food.json';
import FastImage from "react-native-fast-image";
import { useNavigationComponentApp } from "@app-helper/navigateToScreens";

interface SecondProductRouteProps {}
const SecondProductRoute:React.FC<SecondProductRouteProps> = () => {
  const {goToProductDetail} = useNavigationComponentApp()
  const renderItem = ({ item, index }: {item:any, index:number}) => (
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

  return (
    <View style={{flex:1, padding:5, paddingBottom:30}}>
      <FlatList
        data={fastFoodData}
        keyExtractor={(item, index) => item.id ? item?.id.toString() : index.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{gap:10}}
        renderItem={renderItem}
      />
    </View>
  );
}
export default SecondProductRoute