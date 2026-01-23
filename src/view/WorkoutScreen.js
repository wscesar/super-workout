import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Modal, Button, Switch, IconButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import DropDownButton from "../components/DropDownButton";
import { EXERCISES } from "../utils/constants";
import { addSerie } from "../store/workoutSlice";
import NumberInput from "../components/NumberInput";
import Slider from '@react-native-community/slider';


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
  const [dropAmount, setDropAmount] = useState(2);
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(12);
  const [weight, setWeight] = useState([10]);
  const [rest, setRest] = useState([60]);
  const [workout, setWorkout] = useState([]);
  const [exercise, setExercise] = useState(EXERCISES[0]);

  const [isDropset, setIsDropset] = useState(false);
  const [showDropsetModal, setShowDropsetModal] = useState(false);

  // useEffect(() => {
  //   setShowDropsetModal(isDropset)
  // }, [isDropset])

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
      <View style={[css.block]}>
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


  return (
    <>
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
            <Button
              mode="contained"
              style={[css.block]}
              onPress={() => setShowDropsetModal(true)}
            >
              Definir pesos
            </Button>
          </View>

          <View style={[css.row, css.block, css.spaceBetween]}>
            <Text style={css.label}>Same rest</Text>
            <Switch value={sameRest} onValueChange={setSameRest} />
            {renderRestInputs()}
          </View>


          <View style={[css.col1]}>
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

          {
            /*
              <Button icon="plus" mode="contained" onPress={handleAddSerie}>
                Add Serie
              </Button>
            */
          }

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

      <Modal
        animationType="fade"
        visible={showDropsetModal}
        transparent={true}
        dismissableBackButton={true}
        style={[css.modal]}
        contentContainerStyle={css.modalContainer}
        onDismiss={() => {
          setShowDropsetModal(false)
          setIsDropset(false)
        }}
      >
        <View style={css.modalHeader}>
          <Text style={css.modalTitle}>Definir pesos</Text>
          <IconButton
            size={24}
            icon="close"
            onPress={() => setShowDropsetModal(false)}
          />
        </View>

        <View style={[css.row, css.block, css.spaceBetween]}>
          <Text style={css.label}>Dropset</Text>
          <Switch value={isDropset} onValueChange={setIsDropset} />
        </View>
        <View style={[css.row, css.block, css.spaceBetween]}>


          {
            !isDropset &&
            <NumberInput
              label="Carga"
              value={weight[0]}
              onChangeText={(value) => handleWeightChange(0, value.replace(/[^\d]/g, ''))}
            />
          }
          {
            isDropset &&
            <Slider
              step={1}
              style={{ width: '100%', height: 72 }}
              value={dropAmount}
              minimumValue={2}
              maximumValue={6}
              onValueChange={(value) => setDropAmount(value)}
              minimumTrackTintColor="#fff"
              maximumTrackTintColor="#fff"
              renderStepNumber={true}
            />
          }
        </View>
        {
          isDropset &&
          <ScrollView>
            <View style={[css.row, css.spaceBetween]}>
              {
                Array.from({ length: (dropAmount || 1) }).map((_, i) => (
                  <View style={css.col2}>
                    <NumberInput
                      key={i}
                      value={weight[i] || 0}
                      label={isDropset ? `Drop ${i + 1}` : 'Carga'}
                      onChangeText={(value) => handleWeightChange(i, value.replace(/[^\d]/g, ''))}
                    />
                  </View>
                ))
              }
            </View>
          </ScrollView>
        }
      </Modal>
    </>
  )
}

const css = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // alignItems: 'center',
    // minHeight: '100%'
    // justifyContent: 'space-between',
  },
  input: {
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    alignItems: 'center'
  },
  block: {
    width: '100%',
    marginVertical: 8
  },
  spaceBetween: { justifyContent: 'space-between', },
  col1: { minWidth: '100%', maxWidth: '100%' },
  col2: { minWidth: '49%', maxWidth: '49%' },
  col3: { minWidth: '33%', maxWidth: '33%' },
  col4: { minWidth: '24%', maxWidth: '24%' },
  overlay: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#0009',
    justifyContent: 'flex-end',
  },
  modal: {
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#f2f2f2',
    justifyContent: 'flex-start',
    height: '100%',
    padding: 16,
  },
  modalHeader: {
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    color: '#333',
    fontWeight: 600
  },
});