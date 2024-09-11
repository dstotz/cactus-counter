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
  id: string;
  passiveTrigger?: CounterTrigger;
  passiveModifier?: CounterModifier;
  activeModifier?: CounterModifier;
};

export const cards: Card[] = [
  // Active Ability Cards
  {
    name: "Bristly Bill",
    id: "52eef0d6-24b7-40b7-8403-e8e863d0cd55",
    activeModifier: {
      doubleAll: true,
    },
  },

  // Passive Ability Cards
  {
    name: "Branching Evolution",
    id: "c0f1a736-8b12-4f58-a031-bf1733f65c51",
    passiveModifier: {
      doubleAdded: true,
    },
  },
  {
    name: "Inkeeper's Talent (lvl 3)",
    id: "941b0afc-0e8f-45f2-ae7f-07595e164611",
    passiveModifier: {
      doubleAdded: true,
    },
  },
  {
    name: "Vorinclex, Monstrous Raider",
    id: "92613468-205e-488b-930d-11908477e9f8",
    passiveModifier: {
      doubleAdded: true,
    },
  },
  {
    name: "Kami of Whispered Hopes",
    id: "5c644650-3861-4a78-9e39-a413b073ddac",
    passiveModifier: {
      plus: 1,
    },
  },
  {
    name: "Ozolith, the Shattered Spire",
    id: "c9eee658-29e8-4ab5-8a0e-31f2f28a9a92",
    passiveModifier: {
      plus: 1,
    },
  },

  // Passive Trigger Cards
  {
    name: "Mowu, Loyal Companion",
    id: "890e50ae-39e6-435b-95e7-885f2b314ecf",
    passiveTrigger: {
      action: "Add",
      x: 1,
      thing: "+1/+1 Counter",
      if: "counter added to Mowu, Loyal Companion",
    },
  },
  {
    name: "Wildwood Scourge",
    id: "bb35e40f-bbcf-4e2b-9603-7719c74dc076",
    passiveTrigger: {
      action: "Add",
      x: 1,
      thing: "+1/+1 Counter",
      if: "counter added to non-Hydra",
    },
  },
  {
    name: "Basking Broodscale",
    id: "5feba5d6-99a6-4e9b-8a7d-90d955868fc3",
    passiveTrigger: {
      action: "Create",
      x: 1,
      thing: "0/1 Eldrazi Spawn",
      if: "counter added to Basking Broodscale",
    },
  },
  {
    name: "Stocking the Pantry",
    id: "50e95c7b-f0b2-4276-8c5e-4191b7ba35d1",
    passiveTrigger: {
      action: "Add",
      x: 1,
      thing: "supply counter",
    },
  },
  {
    name: "Evolution Witness",
    id: "4d89283e-9783-4006-9294-4ae0473d2ce6",
    passiveTrigger: {
      action: "Return",
      x: 1,
      thing: "permanent from graveyard to hand",
      if: "counter added to Evolution Witness",
    },
  },
  {
    name: "Herd Baloth",
    id: "c1e9cef5-c55f-47d9-9d2f-300dab8fcb0b",
    passiveTrigger: {
      action: "Create",
      x: 1,
      thing: "4/4 Beast",
      if: "counter added to Herd Baloth",
    },
  },
];
