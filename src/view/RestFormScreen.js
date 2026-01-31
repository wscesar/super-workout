import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button, Switch } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import NumberInput from "../components/NumberInput";
import { set_rest } from "../store/exerciseSlice";
import { css } from "../utils/styles";



export default function RestFormScreen({ navigation }) {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const superset = useSelector((state) => state.exercise.superset);

  useLayoutEffect(() => {
    navigation.setOptions({ title: '3 de 4' });
  }, [navigation, t, i18n.language]);

  const [sameRest, setSameRest] = useState(false);
  const [rest, setRest] = useState([30, 60, 90]);
  const [sets, setSets] = useState(4);

  const handleRestChange = (i, value) => {
    setRest((prev) => {
      const rest = [...prev];
      rest[i] = value;
      return rest;
    });
  };

  return (
    <View style={[css.container, css.spaceBetween]}>
      <View>
        <NumberInput
          label={t("workout.sets")}
          value={sets}
          error={sets < 1}
          onChangeText={(t) => { setSets(t.replace(/[^\d]/g, '')) }} // mantém só números (0-9)
        />
        <View style={[css.row, css.col1, css.spaceBetween]}>
          <Text style={css.bold}>Descanso entre as séries</Text>
          {/* <Switch value={sameRest} onValueChange={setSameRest} /> */}
        </View>

        <View style={[css.col1]}>
          {
            Array
              .from({ length: sets - 1 })
              .map((_, i) => (
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
      </View>

      <Button mode="contained" style={[css.col1]}
        onPress={() => {
          dispatch(set_rest(rest));
          navigation.navigate('SummaryScreen');
        }}>
        RESUMO DO TREINO
      </Button>

    </View>

  )
}
