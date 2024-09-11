import { Card, cards } from "@/lib/counterModifiers";
import { Creature } from "./DraggableCreatureBoard";
import { Button, View } from "react-native";

type CreaturesWithActiveAbilitiesProps = {
  creatures: Creature[];
  onActivate: (card: Card) => void;
};

export const CreaturesWithActiveAbilities = ({
  creatures,
  onActivate,
}: CreaturesWithActiveAbilitiesProps) => {
  const creatureCards = [
    ...new Set(
      creatures.map((creature) => cards.find((card) => card.id === creature.id))
    ),
  ];
  const creaturesWithActiveAbilities = creatureCards.filter(
    (card) => card?.activeModifier
  );

  return (
    <View>
      {creaturesWithActiveAbilities.map((card) => {
        if (!card) return undefined;

        return (
          <Button
            title={`Activate ${card.name}`}
            key={card.id}
            onPress={() => onActivate(card)}
          />
        );
      })}
    </View>
  );
};
