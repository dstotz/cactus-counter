import { Button, Pressable, StyleSheet, Text, View } from "react-native";

type CounterButtonProps = {
  title: string;
  numCounters: number;
  onPress: (newCounters: number) => void;
};

export const CounterButton = ({
  title,
  numCounters,
  onPress,
}: CounterButtonProps) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "rgb(210, 230, 255)" : "lightgray",
          },
          styles.button,
        ]}
        onPress={() => onPress(numCounters)}
      >
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    color: "black",
  },
  button: {
    borderRadius: 8,
    padding: 6,
    width: 50,
  },
});
