import { useEffect, useLayoutEffect, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { RadioButton, Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import DropDownButton from "../components/DropDownButton";
import { setWeekDay } from "../store/weekDaySlice";
import { WEEK } from "../utils/constants";
import { css } from "../utils/styles";
import axios from "axios";


export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  // const weekOptions = useMemo(
  //   () => WEEK.map((day) => ({ value: day, label: t(`week.${day}`) })),
  //   [i18n.language, t]
  // );

  // const languageOptions = useMemo(
  //   () => [
  //     { value: "en-US", label: t("home.languageEnglish") },
  //     { value: "pt-BR", label: t("home.languagePortuguese") },
  //   ],
  //   [i18n.language, t]
  // );

  // useEffect(() => {
  //   dispatch(setWeekDay(WEEK[0]));
  // }, [dispatch]);

  useLayoutEffect(() => {
    navigation.setOptions({ title: 'Home' });
  }, [navigation, t, i18n.language]);

  const token = useSelector((state) => state.auth.idToken);
  const userId = useSelector((state) => state.auth.localId);

  useEffect(() => {
    axios
      .get('https://super-workout-10-default-rtdb.firebaseio.com/workouts.json?auth=' + token)
      .then(res => {
        Object.entries(res.data).forEach((item) => {
          const [key, value] = item
          Object.entries(value).forEach(([k, v]) => {
            if (k === 'userId') {
              // userId === v && workouts.push(value['workout'])
            }
          });
        });

      })
  }, [token]);

  return (
    <View style={css.container}>
      <Text>Home Screen</Text>
    </View>
  )
}

