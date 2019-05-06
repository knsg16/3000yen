import { createStackNavigator, createAppContainer } from 'react-navigation';
import firebase from 'firebase';
import { Platform } from 'react-native';
import ENV from './env.json';

import MemoListScreen from './src/screens/MemoListScreen';
import MemoCreateScreen from './src/screens/MemoCreateScreen';
import MemoDetailScreen from './src/screens/MemoDetailScreen';
import MemoEditScreen from './src/screens/MemoEditScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import TodayListScreen from './src/screens/TodayListScreen';
import WeekListScreen from './src/screens/WeekListScreen';
import MonthListScreen from './src/screens/MonthListScreen';

// eslint-disable-next-line
require("firebase/firestore");


const config = {
  apiKey: ENV.FIREBASE_APIKEY,
  authDomain: ENV.FIREBASE_AUTH_DOMAIN,
  databaseURL: ENV.FIREBASE_DB_URL,
  projectId: ENV.FIREBASE_PRJ_ID,
  storageBucket: ENV.FIREBASE_STORAGE,
  messagingSenderId: ENV.FIREBASE_SENDER_ID,
};
firebase.initializeApp(config);

const App = createStackNavigator({
  Login: { screen: LoginScreen },
  TodayList: { screen: TodayListScreen },
  WeekList: { screen: WeekListScreen },
  MonthList: { screen: MonthListScreen },
  MemoCreate: { screen: MemoCreateScreen },
  Home: { screen: MemoListScreen },
  Signup: { screen: SignupScreen },
  MemoDetail: { screen: MemoDetailScreen },
  MemoEdit: { screen: MemoEditScreen },
}, {
  defaultNavigationOptions: {
    headerTitle: '1日3000円生活',
    headerTintColor: '#fff',
    headerBackTitle: null,
    headerStyle: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      backgroundColor: '#1E8CBE',
      ...Platform.select({
        android: {
          paddingTop: 20,
        },
      }),
    },
    headerTitleStyle: {
      color: '#fff',
    },
  },
});

export default createAppContainer(App);
