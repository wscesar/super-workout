import { useEffect } from "react";
import { Button, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import DropDownButton from "../components/DropDownButton";
import { setSelectedDay } from "../store/selectedDaySlice";
import { WEEK } from "../utils/constants";


export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSelectedDay(WEEK[0]));
  }, [dispatch]);

  return (
    <View style={css.container}>
      <DropDownButton
        list={WEEK}
        onSelect={(day) => dispatch(setSelectedDay(day))}
      />
      <Button onPress={() => navigation.navigate('Workout')} title="Click" />
      {/* {
        workouts.map((workout, i) => (
          <View key={i} id="outputWorkouts">
            <Text>{workout}</Text>
          </View>
        ))
      } */}
    </View>
  )
}

const css = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16
  },
});
