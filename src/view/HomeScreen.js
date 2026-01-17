import { useEffect } from "react";
import { Button, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import DropDownButton from "../components/DropDownButton";
import { setWeekDay } from "../store/weekDaySlice";
import { WEEK } from "../utils/constants";


export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setWeekDay(WEEK[0]));
  }, [dispatch]);

  return (
    <View style={css.container}>
      <DropDownButton
        list={WEEK}
        onSelect={(day) => dispatch(setWeekDay(day))}
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
