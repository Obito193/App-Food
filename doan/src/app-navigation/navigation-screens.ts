export const ListStackScreens: Record<string, any> = {
  Home: {
    name: 'Home',
    component: require('@app-views/Home/Home')
      .default,
  },
  Search: {
    name: 'Search',
    component: require('@app-views/Search/Search')
      .default,
  },
  Notification: {
    name: 'Notification',
    component: require('@app-views/Notification/Notification')
      .default,
  },
  Personal: {
    name: 'Personal',
    component: require('@app-views/Personal/Personal')
      .default,
  },
  Cart: {
    name: 'Cart',
    component: require('@app-views/Cart/Cart')
      .default,
  },
  Splash: {
    name: 'Splash',
    component: require('@app-views/Splash/Splash')
      .default,
  },
  Login: {
    name: 'Login',
    component: require('@app-views/LoginAndRegister/Login')
      .default,
  },
  Register: {
    name: 'Register',
    component: require('@app-views/LoginAndRegister/Register')
      .default,
  },
  ProductDetail: {
    name: 'ProductDetail',
    component: require('@app-views/Products/ProductDetail')
      .default,
  },
  BottomContainer: {
    name: 'BottomContainer',
    component: require('@app-navigation/BottomTabs/BottomContainer')
      .default,
  },
}
