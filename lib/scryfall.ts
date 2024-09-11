export type ScryfallCard = {
  object: "card";
  id: string;
  oracle_id: string;
  mtgo_id: number;
  name: string;
  lang: string;
  uri: string;
  scryfall_uri: string;
  layout: string;
  highres_image: boolean;
  image_uris?: {
    small: string;
    normal: string;
    large: string;
    png: string;
    art_crop: string;
    border_crop: string;
  };
  mana_cost: string;
  cmc: number;
  type_line: string;
  oracle_text: string;
  colors: string[];
  color_identity: string[];
  keywords: string[];
} & { [key: string]: any };

export const getCard = async (cardName: string): Promise<ScryfallCard> => {
  const response = await fetch(
    `https://api.scryfall.com/cards/named?fuzzy=${cardName}`
  );
  const card = (await response.json()) as ScryfallCard;
  return card;
};
