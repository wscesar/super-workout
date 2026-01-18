import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { Provider } from "react-redux";
import { PaperProvider } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WorkoutScreen from './src/view/WorkoutScreen';
import HomeScreen from './src/view/HomeScreen';
import { store } from "./src/store/store";
import "./src/i18n";


const Stack = createNativeStackNavigator();

export default function App() {
  // const weekDay = useSelector((state) => state.weekDay.value);
  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaProvider>
        <SafeAreaView style={css.container}>
          <Provider store={store}>
            <PaperProvider>
              <NavigationContainer>
                <Stack.Navigator initialRouteName='Home'>
                  <Stack.Screen name="Home" component={HomeScreen} />
                  <Stack.Screen name="Workout" component={WorkoutScreen} />
                </Stack.Navigator>
              </NavigationContainer>
            </PaperProvider>
          </Provider>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}

const css = StyleSheet.create({
  container: {
    flex: 1,
  },
});
