import { useState } from 'react';
import { Provider, useDispatch, useSelector } from "react-redux";
import { IconButton, PaperProvider } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';

import WorkoutScreen from './src/view/WorkoutScreen';
import DropsetScreen from './src/view/DropsetScreen';
import RestFormScreen from './src/view/RestFormScreen';
import SummaryScreen from './src/view/SummaryScreen';
import AuthScreen from './src/view/AuthScreen';
import { store } from "./src/store/store";
import "./src/i18n";
import { logout } from './src/store/authSlice';


const Stack = createNativeStackNavigator();

function AuthStack() {
  const options = { headerShown: false };

  return (
    <Stack.Navigator initialRouteName='Auth'>
      <Stack.Screen options={options} name="Auth" component={AuthScreen} />
    </Stack.Navigator>
  )
}

function NavStack() {
  const dispatch = useDispatch();

  const options = {
    headerRight: () => <IconButton icon='logout' iconColor="#333" moode='outlined' onPress={() => dispatch(logout())} />
  };

  return (
    <Stack.Navigator initialRouteName='Workout' options={options}>
      <Stack.Screen options={options} name="Workout" component={WorkoutScreen} />
      <Stack.Screen options={options} name="WeightFormScreen" component={DropsetScreen} />
      <Stack.Screen options={options} name="RestFormScreen" component={RestFormScreen} />
      <Stack.Screen options={options} name="SummaryScreen" component={SummaryScreen} />
    </Stack.Navigator>
  )
}

function RootStack() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // if (isTryingLogin) {
  //   return <AppLoading />
  // }

  return (
    <PaperProvider>
      <NavigationContainer>
        {isLoggedIn ? <NavStack /> : <AuthStack />}
      </NavigationContainer>
    </PaperProvider>
  )
}

export default function App() {

  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaProvider>
        <SafeAreaView style={[{ flex: 1 }]}>
          <Provider store={store}>
            <RootStack />
          </Provider>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}

