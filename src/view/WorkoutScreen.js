import { useEffect, useState } from "react";
import { View, Button, StyleSheet, Text, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DropDownButton from "../components/DropDownButton";
import { EXERCISES } from "../utils/constants";
import { setExercise } from "../store/exerciseSlice";


export default function WorkoutScreen({ navigation }) {
  const weekDay = useSelector((state) => state.weekDay.value);
  const teste = useSelector((state) => state.exercise.value);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setExercise(exercise));
  }, [dispatch]);

  const [reps, setReps] = useState("");
  const [rest, setRest] = useState("");
  const [weight, setWeight] = useState("");
  const [title, setTitle] = useState(EXERCISES[0]);
  // const [workout, setWorkout] = useState([]);
  const exercise = { title, weight, reps, rest }
  // const workout = { weekDay, exercices: [] }

  return (
    <>
      <Text>{weekDay}</Text>
      <View style={css.container}>
        <DropDownButton list={EXERCISES} onSelect={setTitle} />
        <View style={css.row}>
          <TextInput keyboardType="numeric" style={css.input} value={weight} onChangeText={setWeight} placeholder="weight" />
          <TextInput keyboardType="numeric" style={css.input} value={reps} onChangeText={setReps} placeholder="repetitions" />
          <TextInput keyboardType="numeric" style={css.input} value={rest} onChangeText={setRest} placeholder="rest time" />
        </View>
        <Button
          title="Add Workout"
          onPress={() => dispatch(setExercise(exercise))}
        />
      </View>
    </>
  )
}

const css = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
    maxWidth: '100%'
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ddd',
    padding: 12,
    backgroundColor: '#fff',
    maxWidth: '30%',
  },
});
