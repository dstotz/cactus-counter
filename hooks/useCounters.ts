import { activatedAbilityCounterCalc, counterCalc } from "@/lib/counterCalc";
import { Card } from "@/lib/counterModifiers";
import { useState } from "react";

export const useCounters = (initialCounters: number = 0) => {
  const [counters, setCounters] = useState(initialCounters);
  const [activeCards, setActiveCards] = useState<Card[]>([]);

  const activateAbility = (card: Card) => {
    const newCounters = activatedAbilityCounterCalc(card, counters);
    addCounters(newCounters);
  };

  const addCounters = (numCounters: number) => {
    const newCounters = counterCalc(numCounters, activeCards);
    setCounters(counters + newCounters);
  };

  const removeCounters = (removeCounters: number) => {
    setCounters(counters - removeCounters);
  };

  return {
    activateAbility,
    counters,
    setCounters,
    addCounters,
    removeCounters,
    activeCards,
    setActiveCards,
  };
};
