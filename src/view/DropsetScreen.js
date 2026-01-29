import { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, ScrollView, Switch } from "react-native";
import { Button, } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import NumberInput from "../components/NumberInput";
import Slider from '@react-native-community/slider';
import { set_drop, set_dropAmount, set_isDropset } from "../store/exerciseSlice";
import { css } from "../utils/styles";


export default function DropsetScreen({ navigation }) {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [dropAmount, setDropAmount] = useState(3);
  const [isDropset] = useState(true);
  const [drop, setDrop] = useState([[]]);
  const superset = useSelector((state) => state.exercise.superset);

  useEffect(() => {
    console.log({ superset })
    const defaultDropValue = [
      { weight: 30, reps: 12, rest: 0 },
      { weight: 20, reps: 12, rest: 0 },
      { weight: 10, reps: 12, rest: 0 },
    ]

    const arr = []
    superset.forEach(_ => {
      arr.push([...defaultDropValue])
    })

    setDrop(arr)
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({ title: '2 de 4: Peso e Repetição' });
  }, [navigation, t, i18n.language]);

  const handleWeight = (i, i2, weight, reps) => {
    setDrop((prev) => {
      const drop = [...prev];
      drop[i][i2] = {
        weight: weight,
        reps: reps,
        rest: 0
      }
      return drop;
    });
  };

  return (
    <View style={[css.spaceBetween, { flex: 1 }]}>
      <ScrollView style={{ maxHeight: '90%' }}>

        <View style={[css.container, css.spaceBetween]}>
          {
            superset.map((exercise, i) => (
              <View key={i} style={[css.mb(16)]}>

                <View style={[css.row, css.center, css.spaceBetween]}>
                  <Text style={[css.bold]}>{exercise.title}</Text>

                  <View style={[css.row, css.col2, css.center, css.end]}>
                    <Text style={css.bold}>Dropset</Text>
                    <Switch
                      style={{ marginTop: 6, marginLeft: 16 }}
                      value={exercise.isDropset}
                      onValueChange={(isDropset) => {
                        dispatch(set_isDropset({ i, isDropset }))
                      }} />
                  </View>
                </View>

                <View style={[css.row, css.spaceBetween]}>
                  {
                    !exercise.isDropset &&
                    <View style={[css.col2]}>
                      <NumberInput
                        value={typeof exercise.dropAmount === 'undefined' ? 3 : exercise.dropAmount}
                        label='Séries'
                        onChangeText={
                          (dropAmount) => dispatch(
                            set_dropAmount({ i, dropAmount })
                          )
                        }
                      />
                    </View>

                  }

                  <View style={[exercise.isDropset ? css.col1 : css.col2,]}>
                    <NumberInput
                      label="Repetições"
                      value={drop[i] && drop[i][0]?.reps || 0}
                      onChangeText={(reps) => {
                        handleWeight(i, 0, drop[i][0].weight, reps)
                      }}
                    />
                  </View>

                </View>
                <View style={[css.row, css.spaceBetween]}>
                  {
                    (drop[i] || [1, 2, 3])
                      .map((drop, i2) => (
                        <View key={i2}
                          style={[
                            // css.col3,
                            exercise.isDropset ? css.col3 : css.col1,
                            !exercise.isDropset && i2 > 0 ? css.hide : '',
                          ]}>
                          <NumberInput
                            value={drop.weight || 1}
                            label={exercise.isDropset ? `Drop ${i2 + 1} (kg)` : 'Carga (kg)'}
                            onChangeText={
                              (v) => handleWeight(i, i2, v.replace(/[^\d]/g, ''), drop.reps)
                            }
                          />
                        </View>
                      ))
                  }
                </View>

              </View>
            ))
          }

          <View>
            {
              false && isDropset &&
              <Slider
                step={1}
                thumbTintColor='#7779'
                disabled={!isDropset}
                style={{ width: '100%', height: 72 }}
                value={!isDropset ? 1 : dropAmount}
                minimumValue={1}
                maximumValue={3}
                onValueChange={(value) => setDropAmount(value)}
                minimumTrackTintColor="#fff"
                maximumTrackTintColor="#fff"
                renderStepNumber={true}
              />
            }

            {
              false && !isDropset &&
              <View style={[css.row, css.col1, css.spaceBetween]}>
                <View style={[css.col1]}>
                  <NumberInput
                    label="Peso (kg)"
                    value={drop[0]?.weight}
                    onChangeText={
                      (value) => [0, 1, 2].forEach(
                        i => handleWeight(i, value.replace(/[^\d]/g, ''))
                      )
                    }
                  />
                </View>
              </View>
            }
          </View>

        </View>
      </ScrollView>
      <View style={[css.ml(16), css.mr(16), css.mb(16)]}>
        <Button
          mode="contained"
          onPress={() => {
            drop.forEach((currentDrop, exerciseIndex) => {
              dispatch(set_drop({
                i: exerciseIndex,
                drop: currentDrop
              }))
            })
            navigation.navigate('RestFormScreen');
          }}>
          Ir Para Descanso
        </Button>
      </View>
    </View>

  )
}