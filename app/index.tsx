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
      <Modal
        animationType="fade"
        visible={modalOpen}
        onRequestClose={() => {
          setModalOpen(!modalOpen);
        }}
        presentationStyle="fullScreen"
      >
        <Image
          source={{ uri: shownCard?.image_uris.large }}
          style={{ width: "100%", height: "65%", marginTop: "25%" }}
        />
        <Button title="Back" onPress={() => setModalOpen(false)} />
      </Modal>

      <ThemedView style={[{ marginTop: 32 }, styles.stepContainer]}>
        <ThemedText
          type="subtitle"
          style={{ textAlign: "center", paddingBottom: 8 }}
        >
          +1/+1 Counters
        </ThemedText>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <CounterButton title="-1" numCounters={1} onPress={removeCounters} />
          <CounterButton
            title="-10"
            numCounters={10}
            onPress={removeCounters}
          />
          <CounterInput
            value={counters}
            onChange={(newCounters) => setCounters(newCounters)}
          />
          <CounterButton title="+1" numCounters={1} onPress={addCounters} />
          <CounterButton title="+10" numCounters={10} onPress={addCounters} />
        </View>
        <Button title="Reset" onPress={() => setCounters(0)} />
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="defaultSemiBold">Active abilities</ThemedText>
        {activeAbilityCards.map((card) => (
          <Button
            key={card.name}
            title={card.name}
            onPress={() => activateAbility(card)}
          />
        ))}
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="defaultSemiBold">Passive abilities</ThemedText>
        {passiveAbilityCards.map((card) => (
          <View
            key={card.name}
            style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
          >
            <Switch
              value={activeCards.includes(card)}
              onValueChange={(value) => handlePassiveAbilityToggle(card, value)}
            />
            <ThemedText onPress={() => handleCardClick(card)}>
              {card.name}
            </ThemedText>
          </View>
        ))}
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="defaultSemiBold">Passive triggers</ThemedText>
        {passiveTriggerCards.map((card) => (
          <View
            key={card.name}
            style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
          >
            <Switch
              value={activeCards.includes(card)}
              onValueChange={(value) => handlePassiveAbilityToggle(card, value)}
            />
            <ThemedText onPress={() => handleCardClick(card)}>
              {card.name}
            </ThemedText>
          </View>
        ))}
      </ThemedView>
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
