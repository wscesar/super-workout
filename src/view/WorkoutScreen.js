import { useState } from "react";
import { View, Button, StyleSheet, Text, TextInput } from "react-native";
import { useSelector } from "react-redux";
import DropDownButton from "../components/DropDownButton";
import { WORKOUTS } from "../utils/constants";


export default function WorkoutScreen({ navigation }) {
  const selectedDay = useSelector((state) => state.selectedDay.value);
  const [reps, setReps] = useState("");
  const [rest, setRest] = useState("");
  const [weight, setWeight] = useState("");
  const workout = {
    exercise: '',
    weight, reps, rest,
  }

  return (
    <View style={css.container}>
      <Text id="output">{selectedDay}</Text>
      <DropDownButton list={WORKOUTS} />
      <TextInput style={css.input} value={weight} onChangeText={setWeight} placeholder="weight" />
      <TextInput style={css.input} value={reps} onChangeText={setReps} placeholder="repetitions" />
      <TextInput style={css.input} value={rest} onChangeText={setRest} placeholder="rest time" />
      <Button
        title="Add Workout"
        onPress={
          () => {

          }
        }
      />
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
  input: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ddd',
    padding: 12,
    backgroundColor: '#fff',
    minWidth: '100%',
  },
});
