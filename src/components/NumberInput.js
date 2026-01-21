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
            style={[css.input]}
            onChangeText={onChangeText}
        />
    )
}

const css = StyleSheet.create({
    input: {
        backgroundColor: '#fff',
        minWidth: '100%', maxWidth: '100%'
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
    },
});
