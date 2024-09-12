import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

export default function Root() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Link href="/individual">Individual Counter</Link>
      <Link href="/creature">Creature Counter</Link>
      <Link href="/sandbox">Sandbox</Link>
    </SafeAreaView>
  );
}
