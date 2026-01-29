import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button, Switch } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import NumberInput from "../components/NumberInput";
import { set_rest } from "../store/exerciseSlice";



export default function RestFormScreen({ navigation }) {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const superset = useSelector((state) => state.exercise.superset);

  useLayoutEffect(() => {
    navigation.setOptions({ title: '3 de 4: Intervalos de descanso' });
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
    <View style={css.container}>
      <View>
        <NumberInput
          label={t("workout.sets")}
          value={sets}
          error={sets < 1}
          onChangeText={(t) => { setSets(t.replace(/[^\d]/g, '')) }} // mantém só números (0-9)
        />
        <View style={[css.row, css.block, css.spaceBetween]}>
          <Text style={css.label}>Descanso entre as séries</Text>
          {/* <Switch value={sameRest} onValueChange={setSameRest} /> */}
        </View>

        <View style={[css.block]}>
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

      <Button mode="contained" style={[css.block]}
        onPress={() => {
          dispatch(set_rest(rest));
          navigation.navigate('SummaryScreen');
        }}>
        RESUMO DO TREINO
      </Button>

    </View>

  )
}

const css = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
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