import { useEffect, useLayoutEffect } from "react";
import { View, ScrollView, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { css } from "../utils/styles";
import axios from "axios";
import { Button } from "react-native-paper";
import { SCREEN } from "../utils/constants";

export default function SummaryScreen({ navigation }) {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const exercise = useSelector((state) => state.exercise);
  const superset = useSelector((state) => state.exercise.superset);
  const token = useSelector((state) => state.auth.idToken);
  const userId = useSelector((state) => state.auth.localId);

  useLayoutEffect(() => {
    navigation.setOptions({ title: 'Resumoo do treino', });
  }, [navigation, t, i18n.language]);

  const saveWorkout = () => {
    const url = 'https://super-workout-10-default-rtdb.firebaseio.com/workouts.json?auth=' + token;
    const payload = {
      userId: userId,
      workout: exercise
    }

    try {
      axios
        .post(url, payload)
        .then(() => navigation.navigate(SCREEN.Home))

    } catch (error) {
      alert('erro')
    }
  }


  return (
    <ScrollView>
      <View style={css.container}>
        {
          [...exercise.rest, null].map((time, timeIndex) => (

            <View key={timeIndex}>
              <View style={[css.row]}>
                <Text style={[css.bold]}>{timeIndex + 1}ª Série</Text>
              </View>
              {
                superset.map((exercise, i) => (
                  <View key={i}>
                    <View style={[css.row, css.center, css.th]}>
                      <Text style={[css.bold]}>{exercise.title}</Text>
                    </View>

                    {
                      exercise.isDropset &&
                      exercise.drop.map((drop, i2) => (
                        <View style={[css.row, (i2 % 2 === 0 ? css.even : css.odd)]} key={i2}>
                          <View style={[css.col2, css.center]}>
                            <Text>{drop.reps}x</Text>
                          </View >
                          <View style={[css.col2, css.center]}>
                            <Text>{drop.weight}kg</Text>
                          </View >
                        </View>
                      ))
                    }

                    {
                      !exercise.isDropset &&
                      Array.from({ length: exercise.dropAmount }).map((_, i2) => (
                        <View style={[css.row, (i2 % 2 === 0 ? css.even : css.odd)]} key={i2}>
                          <View style={[css.col2, css.center]}>
                            <Text>{exercise.drop[i2].reps}x</Text>
                          </View >
                          <View style={[css.col2, css.center]}>
                            <Text>{exercise.drop[i2].weight}kg</Text>
                          </View >
                        </View>
                      ))
                    }

                  </View>
                ))
              }
              {
                !isNaN(parseInt(time)) &&
                <View style={[css.row, css.end, css.tf, css.mb(32)]}>
                  {
                    time > 0
                      ? <Text>Descanso {time}s</Text>
                      : <Text>Sem Descanso</Text>
                  }
                </View>
              }
            </View>

          ))
        }
      </View>
      <Button
        onPress={saveWorkout}
      >Salvar treino</Button>
    </ScrollView>
  )
}
