import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  "en-US": {
    translation: {
      home: {
        title: "Home",
        startButton: "Start workout",
        languageLabel: "Language",
        languageEnglish: "English",
        languagePortuguese: "Portuguese",
      },
      workout: {
        summary: 'Workout Summary:',
        title: "{{day}} workout",
        sets: "Sets",
        repetitions: "Repetitions",
        weight: "Weight",
        restTime: "Rest",
        restTimeIndex: "Rest {{index}}",
        addExerciseToSet: "Add exercise to the set",
        addSetToWorkout: "Add set to the workout",
        setsCount: "Sets: {{count}}",
        dayWorkout: "{{day}} workout",
        exerciseLine: "{{sets}}x {{title}} | {{reps}} reps | {{rest}}s rest",
        seriesForDay: "Series for {{day}}",
        serieLine: "Serie {{index}}: {{count}} exercises",
      },
      week: {
        sunday: "Sunday",
        monday: "Monday",
        tuesday: "Tuesday",
        wednesday: "Wednesday",
        thursday: "Thursday",
        friday: "Friday",
        saturday: "Saturday",
      },
      exercise: {
        squat: "Squat",
        pushUp: "Push-up",
        pullUp: "Pull-up",
        bicepCurl: "Bicep curl",
        skullCrusher: "Skull Crusher",
        shoulderPress: "Shoulder Press",
        legPress: "Leg Press",
      },
    },
  },
  "pt-BR": {
    translation: {
      home: {
        title: "Início",
        startButton: "Iniciar treino",
        languageLabel: "Idioma",
        languageEnglish: "English",
        languagePortuguese: "Português",
      },
      workout: {
        summary: 'Resumo do Treino:',
        title: "Treino de {{day}}",
        sets: "Séries",
        repetitions: "Repetições",
        weight: "Carga",
        restTime: "Descanso",
        restTimeIndex: "Descanso {{index}}",
        addExerciseToSet: "Adicionar exercício à série",
        addSetToWorkout: "Adicionar série ao treino",
        setsCount: "Séries: {{count}}",
        dayWorkout: "Treino de {{day}}",
        exerciseLine:
          "{{sets}}x {{title}} | {{reps}} repetições | {{weight}} kgs | {{rest}}s descanso",
        seriesForDay: "Séries de {{day}}",
        serieLine: "Série {{index}}: {{count}} exercícios",
      },
      week: {
        sunday: "Domingo",
        monday: "Segunda-feira",
        tuesday: "Terça-feira",
        wednesday: "Quarta-feira",
        thursday: "Quinta-feira",
        friday: "Sexta-feira",
        saturday: "Sábado",
      },
      exercise: {
        squat: "Agachamento",
        pushUp: "Flexão",
        pullUp: "Barra fixa",
        bicepCurl: "Rosca bíceps",
        skullCrusher: "Tríceps testa",
        shoulderPress: "Desenvolvimento de ombros",
        legPress: "Leg press",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "pt-BR",
  fallbackLng: "en-US",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
