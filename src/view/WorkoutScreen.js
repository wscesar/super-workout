import { useEffect, useLayoutEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import NumberInput from "../components/NumberInput";
import { set_title, set_reps, set_sets } from "../store/exerciseSlice";


export default function WorkoutScreen({ navigation }) {
  const { t, i18n } = useTranslation();
  const [title, setTitle] = useState('Supino');
  const [sets, setSets] = useState(4);
  const [reps, setReps] = useState(12);

  const dispatch = useDispatch();
  const exercise = useSelector((state) => state.exercise);


  useLayoutEffect(() => {
    navigation.setOptions({ title: '1 de 4: Exercicio, Séries e Repetições' });
  }, [navigation, t, i18n.language]);


  return (
    <View style={[css.container, css.spaceBetween]}>

      <View style={[]}>
        <TextInput
          label={'exercicio'}
          value={title}
          mode='outlined'
          textColor="#333"
          selectionColor="#3339"
          activeOutlineColor="#333"
          style={[css.input]}
          onChangeText={setTitle}
        />

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
      </View>

      <View style={[css.row, css.block, css.spaceBetween]}>
        <Button mode="contained" style={[css.block]} onPress={
          () => {
            dispatch(set_title(title));
            dispatch(set_reps(reps));
            dispatch(set_sets(sets));
            navigation.navigate('WeightFormScreen');
          }
        }>
          DEFINIR PESOS
        </Button>
      </View>
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