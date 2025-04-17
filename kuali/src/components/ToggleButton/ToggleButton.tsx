import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./ToggleButton.style";

interface Props {
  options: string[]; // Por ejemplo: ["opcion 1", "opcion 2"]
  selected: string;
  onChange: (option: string) => void;
}

export default function ViewToggle({ options, selected, onChange }: Props) {
  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.option, selected === option && styles.active]}
          onPress={() => onChange(option)}
        >
          <Text style={[styles.text, selected === option && styles.activeText]}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
