import { counterTextFormat } from "@/lib/counterTextFormat";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

type CounterInputProps = {
  value: number;
  onChange: (newCounters: number) => void;
};

export const CounterInput = ({ value, onChange }: CounterInputProps) => {
  const [lastInputChange, setLastInputChange] = useState<string | undefined>();
  const inputDirty = lastInputChange === value.toString();

  return (
    <View style={styles.container}>
      <TextInput
        caretHidden={true}
        style={styles.textInput}
        value={inputDirty ? value.toString() : counterTextFormat(value)}
        onChange={(e) => {
          const newVal = e.nativeEvent.text;
          onChange(Number(newVal));
          setLastInputChange(newVal);
        }}
      ></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  textInput: {
    textAlign: "center",
    fontSize: 32,
    color: "black",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    padding: 6,
    width: 165,
    height: 75,
  },
});
