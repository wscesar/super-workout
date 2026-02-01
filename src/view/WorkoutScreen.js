import { useLayoutEffect, useState } from "react";
import { View } from "react-native";
import { Button, Switch, Text, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { set_title } from "../store/exerciseSlice";
import { css } from "../utils/styles";
import { SCREEN } from "../utils/constants";


export default function WorkoutScreen({ navigation }) {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [isSuperset, setIsSuperset] = useState(false);
  const superset = useSelector((state) => state.exercise.superset);

  useLayoutEffect(() => {
    navigation.setOptions({ title: '1 de 4' });
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
          style={[css.input, css.col1]}
          onChangeText={title => {
            dispatch(set_title({ i: 0, title }))
          }}
        />

        <View style={[css.row, css.col1, css.spaceBetween]}>
          <Text style={css.bold}>Habilitar Super Série</Text>
          <Switch value={isSuperset} onValueChange={setIsSuperset} />
        </View>

        <View style={[css.row, css.col1, css.spaceBetween]}>
          {isSuperset && <TextInput
            label={'Exercicio 2'}
            value={superset[1]?.title || ''}
            mode='outlined'
            textColor="#333"
            selectionColor="#3339"
            activeOutlineColor="#333"
            style={[css.input, css.col1]}
            onChangeText={title => {
              dispatch(set_title({ i: 1, title: title }))
            }}
          />}
        </View>

      </View>

      <Button mode="contained" style={[css.col1]} onPress={() => navigation.navigate(SCREEN.WeightForm)}
        disabled={
          !isSuperset && !superset[0]?.title ||
          isSuperset && (!superset[0]?.title || !superset[1]?.title)
        }>
        DEFINIR PESOS
      </Button>
    </View>
  )
}
