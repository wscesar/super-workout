import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";


export default function NumberInput({ label, value, onChangeText, disabled }) {
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
            disabled={disabled}
        />
    )
}

const css = StyleSheet.create({
    input: {
        backgroundColor: '#fff',
        width: '100%',
        marginVertical: 8
        // maxHeight: 60
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
    },
});
