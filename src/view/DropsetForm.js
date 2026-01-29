import { useEffect, useLayoutEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button, Switch } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import NumberInput from "../components/NumberInput";
import { set_weight } from "../store/exerciseSlice";


export default function DropsetForm({ exercise }) {
    const dispatch = useDispatch();
    const [dropAmount, setDropAmount] = useState(3);
    const [isDropset, setIsDropset] = useState(true);
    const [weight, setWeight] = useState([30, 20, 10]);
    const [reps, setReps] = useState(12);

    const handleWeightChange = (i, value) => {
        setWeight((prev) => {
            const weight = [...prev];
            weight[i] = value;
            return weight;
        });
    };

    return (
        <>
            <View style={[css.col1, css.center]}>
                <Text style={[css.bold]}>{exercise}</Text>
            </View>

            <View style={[css.col1]}>
                <Text style={[css.bold]}>Repetições</Text>
                <NumberInput label="" value={reps} onChangeText={setReps} />
            </View>

            <View style={[css.row, css.block, css.spaceBetween]}>
                <Text style={css.bold}>Ativar Dropset</Text>
                <Switch value={isDropset} onValueChange={setIsDropset} />
            </View>

            {
                !isDropset &&
                <View style={[css.row, css.block, css.spaceBetween]}>

                    <View style={[css.col1]}>
                        <NumberInput
                            label="Peso (kg)"
                            value={weight[0]}
                            onChangeText={
                                (value) => [0, 1, 2].forEach(i => handleWeightChange(i, value.replace(/[^\d]/g, '')))
                            }
                        />
                    </View>
                </View>
            }

            {
                isDropset &&
                <View style={[css.row, css.block, css.spaceBetween]}>
                    {
                        Array.from(
                            { length: (dropAmount || 1) }
                        ).map((_, i) => (
                            <View key={i} style={[css.col3]}>
                                <NumberInput
                                    disabled={(!isDropset && i > 0)}
                                    value={weight[i] || 0}
                                    label={`Drop ${i + 1} (kg)`}
                                    onChangeText={(value) => handleWeightChange(i, value.replace(/[^\d]/g, ''))}
                                />
                            </View>
                        ))
                    }
                </View>
            }

        </>
    )
}

const css = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
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
    spaceAround: { justifyContent: 'space-around', },
    col1: { minWidth: '100%', maxWidth: '100%' },
    col2: { minWidth: '49%', maxWidth: '49%' },
    col3: { minWidth: '32%', maxWidth: '32%' },
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

    disabled: {
        opacity: .3
    }


});