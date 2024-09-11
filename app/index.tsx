import { StyleSheet, Button, Switch, View, Image, Modal } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCounters } from "@/hooks/useCounters";
import { CounterButton } from "@/components/CounterButton";
import { Card, cards } from "@/lib/counterModifiers";
import { getCard, ScryfallCard } from "@/lib/scryfall";
import { useState } from "react";
import { CounterInput } from "@/components/CounterInput";
import { Link } from "expo-router";

export default function Counter() {
  const [shownCard, setShownCard] = useState<ScryfallCard | undefined>();
  const [modalOpen, setModalOpen] = useState(false);

  const {
    counters,
    setCounters,
    activeCards,
    setActiveCards,
    addCounters,
    activateAbility,
    removeCounters,
  } = useCounters();

  const activeAbilityCards = cards.filter((e) => e.activeModifier);
  const passiveAbilityCards = cards.filter((e) => e.passiveModifier);
  const passiveTriggerCards = cards.filter((e) => e.passiveTrigger);

  const handlePassiveAbilityToggle = (card: Card, value: boolean) => {
    if (value && !activeCards.includes(card)) {
      setActiveCards([...activeCards, card]);
    } else if (!value && activeCards.includes(card)) {
      setActiveCards(activeCards.filter((c) => c !== card));
    }
  };

  const handleCardClick = async (card: Card) => {
    const scryfallDetails = await getCard(card.name);
    setShownCard(scryfallDetails);
    setModalOpen(true);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Link href="/individual">Individual Counter</Link>
      <Link href="/creature">Creature Counter</Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    gap: 8,
    marginBottom: 14,
    padding: 8,
  },
});
