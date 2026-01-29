# Super Workout

A React Native + Expo app to build a fast workout up to supersets, dropsets, custom rest intervals and a final workout summary.

## Overview

The app flow is split into 4 steps:

1. Exercise and optional superset (up to 2 exercises).
2. Define weight, reps, and dropset.
3. Configure rest intervals between sets.
4. Review the workout summary.

## Key Features

- Optional superset (multiple exercises in the same block).
- Dropset per exercise with configurable number of drops.
- Weight and reps per drop/set.
- Custom rest intervals.
- Full workout summary by set.
- i18n support (pt-BR and en-US).

## Tech Stack

- React Native + Expo
- React Navigation (Native Stack)
- Redux Toolkit + React Redux
- React Native Paper (UI)
- i18next / react-i18next

## Getting Started

Prerequisites:

- Node.js LTS
- Expo CLI (or `npx expo`)

Install:

```bash
npm install
```

Run:

```bash
npm run start
```

Other shortcuts:

```bash
npm run android
npm run ios
npm run web
```

## Project Structure

```
.
├── App.js
├── app.json
├── index.js
├── assets/
└── src/
    ├── components/
    │   ├── DropDownButton.js
    │   └── NumberInput.js
    ├── i18n/
    │   └── index.js
    ├── store/
    │   ├── exerciseSlice.js
    │   ├── store.js
    │   ├── weekDaySlice.js
    │   └── workoutSlice.js
    ├── utils/
    │   └── constants.js
    └── view/
        ├── DropsetForm.js
        ├── DropsetScreen.js
        ├── HomeScreen.js
        ├── RestFormScreen.js
        ├── SummaryScreen.js
        └── WorkoutScreen.js
```

## Navigation Flow

- `Workout` → `WeightFormScreen` → `RestFormScreen` → `SummaryScreen`

## Global State (Redux)

- `exerciseSlice`: exercises, dropset config, sets, and rest.
- `weekDaySlice`: selected week day.
- `workoutSlice`: series grouped by day (foundation for future growth).

## App Configuration

Expo settings live in `app.json` (name, icons, splash, and new architecture enabled).

## Suggested Next Steps

- Persist workouts with AsyncStorage.
- Save multiple workouts per day.
- Expand supersets beyond 2 exercises.

## License

No license specified.
