import { useKeepAwake } from "expo-keep-awake";
import { SafeAreaView } from "react-native-safe-area-context";
import { DraggableCreatureBoard } from "@/components/DraggableCreatureBoard";
import * as ScreenOrientation from "expo-screen-orientation";

export default function Counter() {
  useKeepAwake();

  ScreenOrientation.unlockAsync();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DraggableCreatureBoard />
    </SafeAreaView>
  );
}
