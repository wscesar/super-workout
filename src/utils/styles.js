import { StyleSheet } from "react-native";

export const css = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    alignItems: 'center',
    paddingVertical: 2
  },
  input: { backgroundColor: '#fff' },
  bold: { fontWeight: 700 },
  start: { justifyContent: 'flex-start', alignItems: 'center' },
  end: { justifyContent: 'flex-end', alignItems: 'center' },
  even: { backgroundColor: '#fff' },
  odd: { backgroundColor: '#eee' },
  th: { backgroundColor: '#ccc' },
  tf: {
    // backgroundColor: '#ddd',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  mb: (v) => ({ marginBottom: v }),
  mt: (v) => ({ marginTop: v }),
  ml: (v) => ({ marginLeft: v }),
  mr: (v) => ({ marginRight: v }),
  col1: { width: '100%' },
  col2: { width: '49%' },
  col3: { width: '32%' },
  col4: { width: '24%' },
  disabled: { opacity: .3 },
  spaceAround: { justifyContent: 'space-around', },
  spaceBetween: { justifyContent: 'space-between', },
  center: { alignItems: 'center', justifyContent: 'center' },
  hide: { display: 'none', },
})