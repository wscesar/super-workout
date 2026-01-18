import { useLayoutEffect, useMemo, useState } from "react";
import { View, ScrollView, Button, StyleSheet, Text, TextInput, Switch } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DropDownButton from "../components/DropDownButton";
import { EXERCISES } from "../utils/constants";
import { addSerie } from "../store/workoutSlice";


export default function WorkoutScreen({ navigation }) {
  const weekDay = useSelector((state) => state.weekDay.value);
  const seriesForDay = useSelector(
    (state) => state.workout.byDay[weekDay] || []
  );

  useLayoutEffect(() => {
    navigation.setOptions({ title: `${weekDay} workout` });
  }, [navigation]);

  const dispatch = useDispatch();
  const [executions, setExecutions] = useState("1");
  const [sameRest, setSameRest] = useState(true);
  const [restInputs, setRestInputs] = useState([""]);
  const [exerciseTitle, setExerciseTitle] = useState(EXERCISES[0]);
  const [exerciseReps, setExerciseReps] = useState("");
  const [exerciseWeight, setExerciseWeight] = useState("");
  const [exerciseSets, setExerciseSets] = useState({ reps: [], weight: [] });
  const [serieExercises, setSerieExercises] = useState([]);

  const restCount = useMemo(() => {
    const total = Number(executions) || 0;
    if (total <= 1) return 0;
    return sameRest ? 1 : total - 1;
  }, [executions, sameRest]);

  const handleAddSet = () => {
    const repsValue = Number(exerciseReps);
    const weightValue = Number(exerciseWeight);

    if (Number.isNaN(repsValue) || Number.isNaN(weightValue)) {
      return;
    }

    setExerciseReps("");
    setExerciseWeight("");
    setExerciseSets((prev) => ({
      reps: [...prev.reps, repsValue],
      weight: [...prev.weight, weightValue],
    }));
  };

  const handleAddExercise = () => {
    if (exerciseSets.reps.length === 0 || exerciseSets.weight.length === 0) {
      return;
    }

    setExerciseSets({ reps: [], weight: [] });

    setSerieExercises((prev) => [
      ...prev,
      {
        title: exerciseTitle,
        reps: exerciseSets.reps,
        weight: exerciseSets.weight,
      },
    ]);
  };

  const handleAddSerie = () => {
    const totalExecutions = Number(executions) || 0;

    if (totalExecutions < 1 || serieExercises.length === 0) {
      return;
    }

    const restValues = restInputs
      .slice(0, restCount)
      .map((value) => Number(value))
      .filter((value) => !Number.isNaN(value));

    if (restCount > 0 && restValues.length !== restCount) {
      return;
    }

    dispatch(
      addSerie({
        weekDay,
        serie: {
          executions: totalExecutions,
          exercises: serieExercises,
          rest: restValues,
        },
      })
    );
    setExecutions("1");
    setSameRest(true);
    setRestInputs([""]);
    setSerieExercises([]);
  };

  const handleRestChange = (index, value) => {
    setRestInputs((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const renderRestInputs = () => {
    if (restCount === 0) return null;
    const items = Array.from({ length: restCount });
    return (
      <View style={[css.block]}>
        {items.map((_, index) => (
          <TextInput
            key={`rest-${index}`}
            keyboardType="numeric"
            style={[css.input, css.w100]}
            value={restInputs[index] || ""}
            onChangeText={(value) => handleRestChange(index, value)}
            placeholder={`rest ${index + 1}`}
          />
        ))}
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={css.container}>

        <DropDownButton list={EXERCISES} onSelect={setExerciseTitle} />

        <View style={[css.row, css.block]}>
          <TextInput
            keyboardType="numeric"
            style={[css.input, css.w30]}
            value={exerciseWeight}
            onChangeText={setExerciseWeight}
            placeholder="weight"
          />
          <TextInput
            keyboardType="numeric"
            style={[css.input, css.w30]}
            value={exerciseReps}
            onChangeText={setExerciseReps}
            placeholder="repetitions"
          />
          <TextInput
            keyboardType="numeric"
            style={[css.input, css.w30]}
            value={executions}
            onChangeText={setExecutions}
            placeholder="executions"
          />
        </View>

        <View style={css.block}>
          <View style={[css.row, css.spaceBetween]}>
            <Text style={css.label}>Rest Time</Text>
            <View style={css.row}>
              <Text style={css.label}>Same rest</Text>
              <Switch value={sameRest} onValueChange={setSameRest} />
            </View>
          </View>
          {renderRestInputs()}
        </View>

        <View style={css.block}>
          <Button title="Add Set" onPress={handleAddSet} />
          {exerciseSets.reps.length > 0 && (
            <Text style={css.helperText}>
              Sets: {exerciseSets.reps.length}
            </Text>
          )}
          <Button title="Add Exercise" onPress={handleAddExercise} />
        </View>

        {serieExercises.length > 0 && (
          <View style={css.block}>
            <Text style={css.label}>Series exercises</Text>
            {serieExercises.map((exercise, index) => (
              <Text key={`${exercise.title}-${index}`}>
                {exercise.title}: {exercise.reps.length} sets
              </Text>
            ))}
          </View>
        )}

        <Button title="Add Serie" onPress={handleAddSerie} />

        {seriesForDay.length > 0 && (
          <View style={css.block}>
            <Text style={css.label}>Series for {weekDay}</Text>
            {seriesForDay.map((serie, index) => (
              <Text key={`serie-${index}`}>
                Serie {index + 1}: {serie.exercises.length} exercises
              </Text>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  )
}

const css = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },

  input: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    maxHeight: 50
  },


  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '100%',
    flexWrap: 'wrap',
    gap: 8,
    marginVertical: 8
  },
  spaceBetween: { justifyContent: 'space-between', },
  block: {
    gap: 8,
    width: '100%',
    marginBottom: 16,
  },
  w10: { maxWidth: '20%' },
  w20: { maxWidth: '20%' },
  w25: { maxWidth: '25%' },
  w30: { maxWidth: '30%' },
  w40: { maxWidth: '40%' },
  w45: { maxWidth: '45%' },
  w50: { maxWidth: '50%' },
  w100: { maxWidth: '100%' },
  helperText: {
    color: '#555',
  },
});
