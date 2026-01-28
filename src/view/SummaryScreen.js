import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Modal, Button, Switch, IconButton, TextInput, Divider } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import NumberInput from "../components/NumberInput";



export default function SummaryScreen({ navigation }) {
  const { t, i18n } = useTranslation();

  useLayoutEffect(() => {
    navigation.setOptions({ title: 'teste', });
  }, [navigation, t, i18n.language]);

  const dispatch = useDispatch();
  const [rest, setRest] = useState([30, 60, 90]);
  const exercise = useSelector((state) => state.exercise);



  const [workout, setWorkout] = useState({
    rest: [...rest],
    list: []
  });




  const addExercise = () => {
    setWorkout({
      rest: [...rest],
      list: [
        ...(workout.list || []),
        {
          // exercise: exercise,
          // title: exercise,
          // sets: sets,
          // reps: reps,
          // weight: [...weight]
        }
      ]
    })
  }

  return (
    <View style={css.container}>
      <Text>{JSON.stringify(exercise)}</Text>

      <View style={css.block}>
        {
          [...exercise.rest, null].map((time, timeIndex) => (

            <View key={timeIndex} style={[css.block]}>
              {/* {
                workout.list && workout.list.map((workoutItem, i) => (
                  <View key={i}>

                    {exercise.weight.map((weight, i) => (
                      <View key={i} >
                        <View style={[css.row,]}>

                          <View style={[css.col4, css]}>
                            <Text>
                              {weight}kg
                            </Text>
                          </View >

                          <View style={[]}>
                            <Text>
                              {workoutItem.title}
                            </Text>
                          </View >


                        </View>
                      </View>
                    ))}
                  </View>
                ))
              } */}

              <View>
                {exercise.weight.map((weight, i) => (
                  <View key={i} >
                    <View style={[css.row]}>
                      <View style={[css.col4]}>
                        <Text>{weight}kg</Text>
                      </View >
                      <View>
                        <Text>{exercise.title}</Text>
                      </View >
                    </View>
                  </View>
                ))}
              </View>

              <View style={[css.row, css.end, css.block]}>
                {workout.rest[timeIndex] && <Text>Descanso {time}s</Text>}
              </View>

            </View>

          ))
        }
      </View>

      {/* {seriesForDay.length > 0 && (
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
      )} */}
    </View>
  )
}

const css = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // alignItems: 'center',
    minHeight: '100%',
    justifyContent: 'space-between',
    flexDirection: 'column'
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
    minWidth: '100%',
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
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  end: {
    justifyContent: 'flex-end',
    alignItems: 'center',
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