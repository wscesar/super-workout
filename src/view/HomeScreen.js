import { useEffect, useLayoutEffect, useMemo } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { RadioButton } from "react-native-paper";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import DropDownButton from "../components/DropDownButton";
import { setWeekDay } from "../store/weekDaySlice";
import { WEEK } from "../utils/constants";


export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const weekOptions = useMemo(
    () => WEEK.map((day) => ({ value: day, label: t(`week.${day}`) })),
    [i18n.language, t]
  );

  const languageOptions = useMemo(
    () => [
      { value: "en-US", label: t("home.languageEnglish") },
      { value: "pt-BR", label: t("home.languagePortuguese") },
    ],
    [i18n.language, t]
  );

  useEffect(() => {
    dispatch(setWeekDay(WEEK[0]));
  }, [dispatch]);

  useLayoutEffect(() => {
    navigation.setOptions({ title: t("home.title") });
  }, [navigation, t, i18n.language]);

  return (
    <View style={css.container}>
      <DropDownButton
        list={weekOptions}
        onSelect={(day) => dispatch(setWeekDay(day))}
      />
      <View style={css.languageBlock}>
        <Text style={css.sectionLabel}>{t("home.languageLabel")}</Text>
        <RadioButton.Group
          onValueChange={(value) => i18n.changeLanguage(value)}
          value={i18n.language}
        >
          {languageOptions.map((option) => (
            <RadioButton.Item
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </RadioButton.Group>
      </View>
      <Button
        onPress={() => navigation.navigate("Workout")}
        title={t("home.startButton")}
      />
      {/* {
        workouts.map((workout, i) => (
          <View key={i} id="outputWorkouts">
            <Text>{workout}</Text>
          </View>
        ))
      } */}
    </View>
  )
}

const css = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16
  },
  languageBlock: {
    width: "100%",
    marginVertical: 16,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
});
