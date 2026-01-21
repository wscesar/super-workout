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
  const [isDropset, setIsDropset] = useState(false);
  const [dropAmount, setDropAmount] = useState(2);
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(12);
  const [weight, setWeight] = useState([10]);
  const [rest, setRest] = useState([60]);
  const [workout, setWorkout] = useState([]);
  const [exercise, setExercise] = useState(EXERCISES[0]);

  // const restCount = useMemo(() => {
  //   return (sameRest || sets <= 1) ? 1 : sets - 1;
  // }, [sets, sameRest]);

  const handleAddExercise = () => {
    setSets(3);
    setReps(12);
    setRest([60]);
    setWeight([0]);

    setWorkout((prev) => {
      return [
        ...prev,
        { sets, exercise, reps, weight, rest }
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

  const handleWeightChange = (index, value) => {
    setWeight((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const renderRestInputs = () => {
    const inputs = (sameRest || sets <= 1) ? 1 : sets - 1
    return (
      <View style={[css.row, css.block]}>
        {
          Array.from({ length: inputs }).map((_, i) => (
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

  const renderDropsetInputs = () => {
    const inputs = isDropset ? dropAmount : 1
    return (
      <View style={[css.row, css.block]}>
        {isDropset && <NumberInput
          value={dropAmount}
          onChangeText={(value) => setDropAmount(value.replace(/[^\d]/g, ''))}
          label="N Drops"
        />}
        {/* {isDropset && <DropDownButton
          list={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          onSelect={setDropAmount}
        />} */}
        {
          Array.from({ length: inputs }).map((_, i) => (
            <NumberInput
              key={i}
              value={weight[i] || 0}
              label={isDropset ? `Drop ${i + 1}` : 'Carga'}
              onChangeText={(value) => handleWeightChange(i, value.replace(/[^\d]/g, ''))}
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
          <View style={[css.col2]}>
            <NumberInput
              label={t("workout.sets")}
              value={sets}
              error={sets < 1}
              onChangeText={(t) => { setSets(t.replace(/[^\d]/g, '')) }} // mantém só números (0-9)
            />
          </View>

          <View style={[css.col2]}>
            <NumberInput
              label={t("workout.repetitions")}
              value={`${reps}`}
              error={reps < 1}
              onChangeText={(t) => { setReps(t.replace(/[^\d]/g, '')) }} // mantém só números (0-9)
            />
          </View>

        </View>

        <View style={[css.row, css.block, css.spaceBetween]}>
          <Text style={css.label}>Dropset</Text>
          <Switch value={isDropset} onValueChange={setIsDropset} />
          {renderDropsetInputs()}
        </View>

        <View style={[css.row, css.block, css.spaceBetween]}>
          <Text style={css.label}>Same rest</Text>
          <Switch value={sameRest} onValueChange={setSameRest} />
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
              workout.map((w, i) => (
                <>
                  {
                    w.rest.length === 1 && (
                      <Text key={i}>
                        {t("workout.exerciseLine", {
                          sets: w.sets,
                          title: t(`exercise.${w.exercise}`),
                          reps: w.reps,
                          weight: w.weight[0],
                          rest: w.rest[0],
                        })}
                      </Text>
                    )
                  }

                  {
                    w.rest.length > 1 && (
                      <View>
                        <Text>{w.exercise}</Text>
                        {
                          w.rest.map((rest, i2) => (
                            <Text key={`${i}_${i2}`}>
                              {i2 + 1}o {w.reps}x | {w.weight}kg | {rest}s
                            </Text>
                          ))
                        }
                      </View>
                    )
                  }
                </>
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
    // gap: 8,
  },
  block: {
    width: '100%',
    marginVertical: 8
  },
  spaceBetween: { justifyContent: 'space-between', },
  w10: { minWidth: '10%', maxWidth: '10%' },
  w15: { minWidth: '15%', maxWidth: '15%' },
  w20: { minWidth: '20%', maxWidth: '20%' },
  w25: { minWidth: '25%', maxWidth: '25%' },
  w30: { minWidth: '30%', maxWidth: '30%' },
  col2: { minWidth: '49%', maxWidth: '49%' },
  w45: { minWidth: '45%', maxWidth: '45%' },
  w50: { minWidth: '50%', maxWidth: '50%' },
  w60: { minWidth: '60%', maxWidth: '60%' },
  w100: { minWidth: '100%', maxWidth: '100%' },
  helperText: {
    color: '#555',
  },
});
