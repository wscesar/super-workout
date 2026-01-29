import { useEffect, useLayoutEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Switch, Text, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { set_title } from "../store/exerciseSlice";


export default function WorkoutScreen({ navigation }) {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [isSuperset, setIsSuperset] = useState(false);
  const superset = useSelector((state) => state.exercise.superset);

  useLayoutEffect(() => {
    navigation.setOptions({ title: '1 de 4: Exercicio, Séries e Repetições' });
  }, [navigation, t, i18n.language]);

  return (
    <View style={[css.container, css.spaceBetween]}>

      <View>
        <TextInput
          label={'Exercicio'}
          value={superset[0].title}
          mode='outlined'
          textColor="#333"
          selectionColor="#3339"
          activeOutlineColor="#333"
          style={[css.input, css.block]}
          onChangeText={title => {
            dispatch(set_title({ i: 0, title }))
          }}
        />

        <View style={[css.row, css.block, css.spaceBetween]}>
          <Text style={css.label}>Habilitar Super Série</Text>
          <Switch value={isSuperset} onValueChange={setIsSuperset} />
        </View>

        <View style={[css.row, css.block, css.spaceBetween]}>
          {isSuperset && <TextInput
            label={'Exercicio 2'}
            value={superset[1]?.title || ''}
            mode='outlined'
            textColor="#333"
            selectionColor="#3339"
            activeOutlineColor="#333"
            style={[css.input, css.block]}
            onChangeText={title => {
              dispatch(set_title({ i: 1, title: title }))
            }}
          />}
        </View>

      </View>

      <Button mode="contained" style={[css.block]} onPress={() => navigation.navigate('WeightFormScreen')}
        disabled={
          !isSuperset && !superset[0]?.title ||
          isSuperset && (!superset[0]?.title || !superset[1]?.title)
        }>
        DEFINIR PESOS
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
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
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