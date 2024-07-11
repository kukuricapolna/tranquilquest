import { useState } from "react";
import { FlatList, View } from "react-native";
import { Button } from "react-native-paper";

interface PickerProps {
  items: Array<string>;
  onChange: (item: string) => void;
}

export default function Picker({ items, onChange }: PickerProps) {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropDownOpen] = useState(false);

  const handleSelectedItem = (item: string) => {
    setSelectedItem(item);
    onChange(item);
    setIsDropDownOpen(false);
  };
  return (
    <View>
      <Button onPress={() => setIsDropDownOpen(!isDropdownOpen)}>Select</Button>
      {isDropdownOpen && (
        <FlatList
          style={{ height: 500 }}
          data={items}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Button onPress={() => handleSelectedItem(item)}>{item}</Button>
          )}
        />
      )}
    </View>
  );
}
