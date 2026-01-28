import { useEffect, useLayoutEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button, Switch } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import NumberInput from "../components/NumberInput";
import Slider from '@react-native-community/slider';
import { set_weight } from "../store/exerciseSlice";


export default function DropsetScreen({ navigation }) {
  const { t, i18n } = useTranslation();
  const [dropAmount, setDropAmount] = useState(3);
  const [isDropset, setIsDropset] = useState(true);

  // const weight = useSelector((state) => state.exercise.weight); 
  const exercise = useSelector((state) => state.exercise);

  const [weight, setWeight] = useState([30, 20, 10]);
  const dispatch = useDispatch();

  useEffect(() => {

  }, [weight]);

  useLayoutEffect(() => {
    const title = '2 de 4: Dropset e Pesos';
    navigation.setOptions({ title });
  }, [navigation, t, i18n.language]);


  const handleWeightChange = (i, value) => {
    setWeight((prev) => {
      const weight = [...prev];
      weight[i] = value;
      return weight;
    });


  };

  return (
    <View style={[css.container, css.spaceBetween]}>
      <View>

        <View style={[css.row, css.block, css.spaceBetween]}>
          <Text style={css.label}>Dropset para {exercise.title}</Text>
          <Switch value={isDropset} onValueChange={setIsDropset} />
        </View>

        <View style={[css.block]}>
          {
            !isDropset &&
            <NumberInput
              label="Carga" a
              value={weight[0]}
              onChangeText={
                (value) => [0, 1, 2].forEach(i => handleWeightChange(i, value.replace(/[^\d]/g, '')))
              }
            />
          }
          {
            isDropset &&
            <Slider
              step={1}
              disabled={!isDropset}
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
          <View style={[css.row, css.spaceBetween]}>
            {
              Array.from(
                { length: (dropAmount || 1) }
              ).map((_, i) => (
                <View key={i} style={css.col2}>
                  <NumberInput
                    disabled={(!isDropset && i > 0)}
                    value={weight[i] || 0}
                    label={`Carga ${i + 1}`}
                    onChangeText={(value) => handleWeightChange(i, value.replace(/[^\d]/g, ''))}
                  />
                </View>
              ))
            }
          </View>

        }
      </View>

      <Button mode="contained" style={[css.block]}
        onPress={(v) => {
          dispatch(set_weight(weight));
          navigation.navigate('RestFormScreen');
        }}>
        Definir descanso
      </Button>
    </View>
  )
}

const css = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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


});