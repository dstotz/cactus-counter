import { Creature } from "@/types/creature";
import { ScryfallCard } from "@/types/scryfall";
import uuid from "react-native-uuid";

export const getCard = async (cardName: string): Promise<ScryfallCard> => {
  const response = await fetch(
    `https://api.scryfall.com/cards/named?fuzzy=${cardName}`
  );
  const card = (await response.json()) as ScryfallCard;
  return card;
};

export const scryfallCardToCreature = (card: ScryfallCard): Creature => ({
  id: card.id,
  key: uuid.v4().toString(),
  numCounters: 0,
  imageUrl: card.image_uris?.normal,
  name: card.name,
});
