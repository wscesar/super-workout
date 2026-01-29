import { useLayoutEffect } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";


export default function SummaryScreen({ navigation }) {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const exercise = useSelector((state) => state.exercise);
  const superset = useSelector((state) => state.exercise.superset);

  useLayoutEffect(() => {
    navigation.setOptions({ title: 'Resumoo do treino', });
  }, [navigation, t, i18n.language]);


  return (
    <View style={css.container}>
      <ScrollView>
        <View style={css.block}>
          {
            [...exercise.rest, null].map((time, timeIndex) => (

              <View key={timeIndex} style={[css.block]}>
                <View style={[css.block]}>
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
                  <View style={[css.row, css.end, css.tf]}>
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
      </ScrollView>
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
    alignItems: 'center',
    paddingVertical: 3,
    paddingHorizontal: 16
  },
  block: {
    width: '100%',
    marginVertical: 8
  },
  bold: {
    fontWeight: 600
  },
  spaceBetween: { justifyContent: 'space-between', },
  col1: { width: '100%', },
  col2: { width: '49%', },
  col3: { width: '33%', },
  col4: { width: '24%', },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  end: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  even: { backgroundColor: '#fff' },
  odd: { backgroundColor: '#eee' },
  th: { backgroundColor: '#ccc' },
  tf: {
    // backgroundColor: '#ddd',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },

});