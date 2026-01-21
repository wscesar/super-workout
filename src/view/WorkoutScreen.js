import { useLayoutEffect, useMemo, useState } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import { TextInput, Button, Switch } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import DropDownButton from "../components/DropDownButton";
import { EXERCISES } from "../utils/constants";
import { addSerie } from "../store/workoutSlice";


export default function WorkoutScreen({ navigation }) {
  const { t, i18n } = useTranslation();
  const weekDay = useSelector((state) => state.weekDay.value);
  const seriesForDay = useSelector(
    (state) => state.workout.byDay[weekDay] || []
  );

  const weekDayLabel = weekDay ? t(`week.${weekDay}`) : "";
  const exerciseOptions = useMemo(
    () => EXERCISES.map((id) => ({ value: id, label: t(`exercise.${id}`) })),
    [i18n.language, t]
  );

  useLayoutEffect(() => {
    if (!weekDayLabel) return;
    navigation.setOptions({
      title: t("workout.title", { day: weekDayLabel }),
    });
  }, [navigation, t, i18n.language, weekDayLabel]);

  const dispatch = useDispatch();
  const [executions, setExecutions] = useState("3");
  const [sameRest, setSameRest] = useState(true);
  const [restInputs, setRestInputs] = useState(["60"]);
  const [exerciseTitle, setExerciseTitle] = useState(EXERCISES[0]);
  const [exerciseReps, setExerciseReps] = useState("12");
  const [exerciseWeight, setExerciseWeight] = useState("0");
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

  // const handleAddSerie = () => {
  //   const totalExecutions = Number(executions) || 0;

  //   if (totalExecutions < 1 || serieExercises.length === 0) {
  //     return;
  //   }

  //   const restValues = restInputs
  //     .slice(0, restCount)
  //     .map((value) => Number(value))
  //     .filter((value) => !Number.isNaN(value));

  //   if (restCount > 0 && restValues.length !== restCount) {
  //     return;
  //   }

  //   dispatch(
  //     addSerie({
  //       weekDay,
  //       serie: {
  //         executions: totalExecutions,
  //         exercises: serieExercises,
  //         rest: restValues,
  //       },
  //     })
  //   );
  //   setExecutions("1");
  //   setSameRest(true);
  //   setRestInputs([""]);
  //   setSerieExercises([]);
  // };

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
      <View>
        {items.map((_, i) => (
          <TextInput
            key={`rest-${i}`}
            keyboardType="numeric"
            style={[css.input, css.block, css.w100]}
            value={restInputs[i] || "60"}
            onChangeText={(value) => handleRestChange(i, value)}
            label={
              sameRest
                ? t("workout.restTime")
                : t("workout.restTimeIndex", { index: i + 1 })
            }
            mode="outlined"
          />
        ))}
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={css.container}>

        <DropDownButton list={exerciseOptions} onSelect={setExerciseTitle} />

        <View style={[css.row, css.block, css.spaceBetween]}>
          <TextInput
            selectionColor="#3339"
            activeOutlineColor="#333"
            textColor="#333"
            label={t("workout.sets")}
            mode='outlined'
            style={[css.w30, css.input]}
            keyboardType="numeric"
            value={executions}
            error={parseInt(executions) < 1}
            onChangeText={(t) => {
              // mantém só números (0-9)
              setExecutions(t.replace(/[^\d]/g, ''));
            }}
          />
          <TextInput
            selectionColor="#3339"
            activeOutlineColor="#333"
            textColor="#333"
            label={t("workout.repetitions")}
            mode='outlined'
            style={[css.w30, css.input]}
            keyboardType="numeric"
            value={exerciseReps}
            error={parseInt(exerciseReps) < 1}
            onChangeText={(t) => {
              // mantém só números (0-9)
              setExerciseReps(t.replace(/[^\d]/g, ''));
            }}
          />
          <TextInput
            selectionColor="#3339"
            activeOutlineColor="#333"
            textColor="#333"
            label={t("workout.weight")}
            mode='outlined'
            style={[css.w30, css.input]}
            keyboardType="numeric"
            value={exerciseWeight}
            error={parseInt(exerciseWeight) < 0}
            onChangeText={(t) => {
              // mantém só números (0-9)
              setExerciseWeight(t.replace(/[^\d]/g, ''));
            }}
          />
        </View>


        <View style={[css.row, css.block, css.spaceBetween]}>
          {/* <Text style={css.label}>Same rest</Text> */}
          {/* <Switch value={sameRest} onValueChange={setSameRest} /> */}
          {renderRestInputs()}
        </View>


        <View style={[css.w100]}>
          <Button
            icon="plus"
            mode="contained"
            style={[css.block]}
            onPress={handleAddSet}
            disabled={!exerciseReps || !exerciseWeight}
          >
            {t("workout.addExerciseToSet")}
          </Button>
          {
            exerciseSets.reps.length > 0 && (
              <Text style={css.helperText}>
                {t("workout.setsCount", { count: exerciseSets.reps.length })}
              </Text>
            )
          }
          <Button
            style={[css.block]}
            icon="plus"
            mode="contained"
            onPress={handleAddExercise}
            disabled={exerciseSets.reps.length <= 0}
          >
            {t("workout.addSetToWorkout")}
          </Button>
        </View>

        {serieExercises.length > 0 && (
          <View style={css.block}>
            <Text style={css.label}>
              {t("workout.dayWorkout", { day: weekDayLabel })}
            </Text>
            {
              serieExercises.map((e, i) => (
                <Text key={`${e.title}-${i}`}>
                  {t("workout.exerciseLine", {
                    sets: e.reps.length,
                    title: t(`exercise.${e.title}`),
                    reps: e.rest || 12,
                    rest: restInputs || 60,
                  })}
                </Text>
              ))
            }
          </View>
        )}

        {/* <Button icon="plus" mode="contained" onPress={handleAddSerie}>
          Add Serie
        </Button> */}

        {seriesForDay.length > 0 && (
          <View style={css.block}>
            <Text style={css.label}>
              {t("workout.seriesForDay", { day: weekDayLabel })}
            </Text>
            {seriesForDay.map((serie, index) => (
              <Text key={`serie-${index}`}>
                {t("workout.serieLine", {
                  index: index + 1,
                  count: serie.exercises.length,
                })}
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
    backgroundColor: '#fff',
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
  },
  block: {
    width: '100%',
    marginVertical: 8
  },
  spaceBetween: { justifyContent: 'space-between', },
  w10: { minWidth: '20%', maxWidth: '20%' },
  w20: { minWidth: '20%', maxWidth: '20%' },
  w25: { minWidth: '25%', maxWidth: '25%' },
  w30: { minWidth: '30%', maxWidth: '30%' },
  w40: { minWidth: '40%', maxWidth: '40%' },
  w45: { minWidth: '45%', maxWidth: '45%' },
  w50: { minWidth: '50%', maxWidth: '50%' },
  w100: { minWidth: '100%', maxWidth: '100%' },
  helperText: {
    color: '#555',
  },
});
