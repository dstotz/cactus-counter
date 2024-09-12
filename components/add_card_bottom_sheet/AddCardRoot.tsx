import { StyleSheet, View } from "react-native";
import { Button } from "../core/Button";
import uuid from "react-native-uuid";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useContext } from "react";
import { AddCardContext } from "@/contexts/AddCard";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../AddCardBottomSheet";
import { Creature } from "@/types/creature";

type Props = NativeStackScreenProps<RootStackParamList, "Add Card">;

export const AddCardRoot = () => {
  const { addCard } = useContext(AddCardContext);
  const { navigate } = useNavigation<any>();

  const genericCreature = (): Creature => ({
    id: uuid.v4().toString(),
    key: uuid.v4().toString(),
    name: "Creature",
    numCounters: 0,
  });

  return (
    <View style={styles.wrapper}>
      <Button
        title="Generic"
        onPress={() => addCard && addCard(genericCreature())}
      />
      <Button title="Search" onPress={() => navigate("Search")} />
      <Button title="Recent" onPress={() => navigate("Recent")} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
