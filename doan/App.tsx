import { Provider } from 'react-redux';
import store from './src/redux/store';
import AppNavigator from './src/app-navigation/navigation-container';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { toastConfig } from '@app-components/CustomToast/ToatConfig';
import { SafeAreaView } from 'react-native';



export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppNavigator />
        <Toast config={toastConfig} />
      </GestureHandlerRootView>
    </Provider>
  );
}
