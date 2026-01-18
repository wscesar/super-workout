import { useEffect, useMemo, useState } from 'react';
import { View, TouchableOpacity, Text, Modal, StyleSheet } from 'react-native';
import { Button, Menu } from 'react-native-paper';


const DropDownButton = ({ onSelect, list }) => {
  const normalizedList = useMemo(
    () =>
      (list || []).map((item) =>
        typeof item === "string"
          ? { label: item, value: item }
          : { label: item.label, value: item.value }
      ),
    [list]
  );

  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(normalizedList[0]?.value);

  useEffect(() => {
    if (!normalizedList.length) {
      setValue(undefined);
      return;
    }
    if (!normalizedList.some((item) => item.value === value)) {
      setValue(normalizedList[0].value);
    }
  }, [normalizedList, value]);

  const selectedLabel = useMemo(() => {
    const selected = normalizedList.find((item) => item.value === value);
    return selected ? selected.label : "";
  }, [normalizedList, value]);
  // return (
  //   <View style={{ padding: 16 }}>
  //     <Menu
  //       visible={visible}
  //       onDismiss={() => setVisible(false)}
  //       anchor={
  //         <Button mode="outlined" onPress={() => setVisible(true)}>
  //           {value} ▾
  //         </Button>
  //       }
  //     >
  //       <Menu.Item onPress={() => { setValue('A'); setVisible(false); }} title="A" />
  //       <Menu.Item onPress={() => { setValue('B'); setVisible(false); }} title="B" />
  //       <Menu.Item onPress={() => { setValue('C'); setVisible(false); }} title="C" />
  //     </Menu>
  //   </View>
  // )
  return (<>
    <TouchableOpacity style={css.selector} onPress={() => setVisible(true)}>
      <Text style={[css.text, css.bold]}>{selectedLabel}</Text>
      <Text style={css.icon}>▼</Text>
    </TouchableOpacity>

    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setVisible(false)}>
      <TouchableOpacity
        activeOpacity={1}
        style={css.overlay}
        onPress={() => setVisible(false)}>
        <View style={css.list}>
          {
            normalizedList.map((item) => (
              <TouchableOpacity
                key={item.value}
                style={[css.item, item.value === value && css.active]}
                onPress={() => {
                  setValue(item.value);
                  setVisible(false);
                  onSelect && onSelect(item.value);
                }}>
                <Text style={[css.text, item.value === value && css.active]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))
          }
        </View>
      </TouchableOpacity>
    </Modal>
  </>
  );
};

const css = StyleSheet.create({
  selector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#999',
    minWidth: '100%'
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
  bold: {
    fontWeight: '600',
  },
  icon: {
    fontSize: 12,
    color: '#777',
  },
  overlay: {
    flex: 1,
    backgroundColor: '#0009',
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    backgroundColor: '#fff',
    minWidth: 250,
    maxHeight: 500,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },

  active: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2196F3',
    backgroundColor: '#e3f2fd',
  },
});

export default DropDownButton;
