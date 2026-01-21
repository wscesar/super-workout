import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";


export default function NumberInput({ label, value, onChangeText }) {
    return (
        <TextInput
            label={label}
            value={`${value}`}
            mode='outlined'
            textColor="#333"
            keyboardType="numeric"
            selectionColor="#3339"
            activeOutlineColor="#333"
            style={[css.w30, css.input]}
            onChangeText={onChangeText}
        />
    )
}

const css = StyleSheet.create({
    input: {
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
    },
    w10: { minWidth: '20%', maxWidth: '20%' },
    w20: { minWidth: '20%', maxWidth: '20%' },
    w25: { minWidth: '25%', maxWidth: '25%' },
    w30: { minWidth: '30%', maxWidth: '30%' },
    w40: { minWidth: '40%', maxWidth: '40%' },
    w45: { minWidth: '45%', maxWidth: '45%' },
    w50: { minWidth: '50%', maxWidth: '50%' },
    w100: { minWidth: '100%', maxWidth: '100%' },
});
