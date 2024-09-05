import { Card } from "./counterModifiers";

// Returns the new number of counters after applying all active card abilities
export const counterCalc = (
  countersToAdd: number,
  activeCards: Card[]
): number => {
  let newCounters = countersToAdd;
  // Apply all active card plusOne abilities
  activeCards
    .filter((card) => card.passiveModifier?.plus)
    .forEach((card) => {
      if (newCounters > 0) {
        newCounters += card.passiveModifier!.plus!;
      }
    });
  // Apply all active card doubleAdded abilities
  activeCards
    .filter((card) => card.passiveModifier?.doubleAdded)
    .forEach(() => {
      newCounters *= 2;
    });

  return newCounters;
};

export const activatedAbilityCounterCalc = (
  card: Card,
  currentCounters: number
): number => {
  let newCounters = 0;
  if (card.activeModifier?.plus) {
    newCounters += card.activeModifier.plus;
  }
  if (card.activeModifier?.doubleAll) {
    newCounters += currentCounters;
  }
  if (card.activeModifier?.doubleAdded) {
    newCounters *= 2;
  }
  return newCounters;
};
