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

export type Card2 = {
  name: string;
  key: string;
  plusOneCounters: number;
  scryfallId?: string;
  abilities?: {
    passiveTrigger?: CounterTrigger;
    passiveModifier?: CounterModifier;
    activeModifier?: CounterModifier;
  };
};
