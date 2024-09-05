// Types
export type CounterTrigger = {
  action: string;
  x: number;
  thing: string;
  if?: string;
};

export type CounterModifier = {
  plus?: number;
  doubleAll?: boolean;
  doubleAdded?: boolean;
};

export type Card = {
  name: string;
  passiveTrigger?: CounterTrigger;
  passiveModifier?: CounterModifier;
  activeModifier?: CounterModifier;
};

export const cards: Card[] = [
  // Active Ability Cards
  {
    name: "Bristly Bill",
    activeModifier: {
      doubleAll: true,
    },
  },

  // Passive Ability Cards
  {
    name: "Branching Evolution",
    passiveModifier: {
      doubleAdded: true,
    },
  },
  {
    name: "Inkeeper's Talent (lvl 3)",
    passiveModifier: {
      doubleAdded: true,
    },
  },
  {
    name: "Mowu, Loyal Companion",
    passiveModifier: {
      plus: 1,
    },
  },
  {
    name: "Vorinclex, Monstrous Raider",
    passiveModifier: {
      doubleAdded: true,
    },
  },
  {
    name: "Kami of Whispered Hopes",
    passiveModifier: {
      plus: 1,
    },
  },

  // Passive Trigger Cards
  {
    name: "Wildwood Scourge",
    passiveTrigger: {
      action: "Add",
      x: 1,
      thing: "+1/+1 Counter",
      if: "counter added to non-Hydra",
    },
  },
  {
    name: "Basking Broodscale",
    passiveTrigger: {
      action: "Create",
      x: 1,
      thing: "0/1 Eldrazi Spawn",
      if: "counter added to Basking Broodscale",
    },
  },
  {
    name: "Stocking the Pantry",
    passiveTrigger: {
      action: "Add",
      x: 1,
      thing: "supply counter",
    },
  },
  {
    name: "Evolution Witness",
    passiveTrigger: {
      action: "Return",
      x: 1,
      thing: "permanent from graveyard to hand",
      if: "counter added to Evolution Witness",
    },
  },
  {
    name: "Herd Baloth",
    passiveTrigger: {
      action: "Create",
      x: 1,
      thing: "4/4 Beast",
      if: "counter added to Herd Baloth",
    },
  },
];
