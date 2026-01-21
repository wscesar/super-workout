import { useLayoutEffect, useMemo, useState } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import { Button, Switch } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import DropDownButton from "../components/DropDownButton";
import { EXERCISES } from "../utils/constants";
import { addSerie } from "../store/workoutSlice";
import NumberInput from "../components/NumberInput";


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
  const [sameRest, setSameRest] = useState(true);
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(12);
  const [weight, setWeight] = useState(10);
  const [rest, setRest] = useState([60]);
  const [workout, setWorkout] = useState([]);
  const [exercise, setExercise] = useState(EXERCISES[0]);

  const restCount = useMemo(() => {
    const total = Number(sets) || 0;
    if (total <= 1) return 0;
    return sameRest ? 1 : total - 1;
  }, [sets, sameRest]);

  const handleAddExercise = () => {
    const seriesValue = Number(sets);
    const repsValue = Number(reps);
    const weightValue = Number(weight);

    setSets(3);
    setReps(12);
    setWeight(0);
    setRest([60]);

    setWorkout((prev) => {
      console.log({ prev })
      return [
        ...prev,
        {
          series: seriesValue,
          title: exercise,
          reps: repsValue,
          weight: weightValue,
          rest: rest
        },
      ]
    });
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
    setRest((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const renderRestInputs = () => {
    if (restCount === 0) return null;

    const items = Array.from({ length: restCount });

    return (
      <View style={[css.row, css.block]}>
        {
          items.map((_, i) => (
            <NumberInput
              key={i}
              value={rest[i] || 60}
              onChangeText={(value) => handleRestChange(i, value.replace(/[^\d]/g, ''))}
              label={
                sameRest
                  ? t("workout.restTime")
                  : t("workout.restTimeIndex", { index: i + 1 })
              }
            />
          ))
        }
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={css.container}>

        <DropDownButton list={exerciseOptions} onSelect={setExercise} />

        <View style={[css.row, css.block, css.spaceBetween]}>
          <NumberInput
            label={t("workout.sets")}
            value={sets}
            error={sets < 1}
            onChangeText={(t) => {
              setSets(t.replace(/[^\d]/g, '')); // mantém só números (0-9)
            }}
          />
          <NumberInput
            label={t("workout.repetitions")}
            value={`${reps}`}
            error={reps < 1}
            onChangeText={(t) => {
              setReps(t.replace(/[^\d]/g, '')); // mantém só números (0-9)
            }}
          />
          <NumberInput
            label={t("workout.weight")}
            value={`${weight}`}
            onChangeText={(t) => {
              setWeight(t.replace(/[^\d]/g, '')); // mantém só números (0-9)
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
            onPress={handleAddExercise}
          // disabled={!exerciseReps || !exerciseWeight}
          >
            {t("workout.addSetToWorkout")}
          </Button>
        </View>

        {workout.length > 0 && (
          <View style={css.block}>
            <Text style={css.label}>
              {t("workout.dayWorkout", { day: weekDayLabel })}
            </Text>
            {
              workout.map((e, i) => (
                <Text key={i}>
                  {t("workout.exerciseLine", {
                    sets: e.series,
                    title: t(`exercise.${e.title}`),
                    reps: e.reps,
                    weight: e.weight,
                    rest: e.rest[0],
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
