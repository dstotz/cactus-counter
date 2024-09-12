import { AddCardContext } from "@/contexts/AddCard";
import { useContext, useState } from "react";
import { Alert, Image, Keyboard, StyleSheet, View } from "react-native";
import { Button } from "../core/Button";
import { useAsyncStorage } from "@/hooks/useAsyncStorage";
import { ScryfallCard } from "@/types/scryfall";
import { getCard, scryfallCardToCreature } from "@/lib/scryfall";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";

export const Search = () => {
  const { addCard } = useContext(AddCardContext);
  const [query, setQuery] = useState("");
  const [card, setCard] = useState<ScryfallCard | null>(null);
  const [recentCards, setRecentCards] = useAsyncStorage<ScryfallCard[]>(
    "recentCards",
    []
  );

  const onSearch = async () => {
    Keyboard.dismiss();
    console.log({ query });
    getCard(query)
      .then((match) => {
        if (!match.id) throw new Error();
        setCard(match);
        console.log({ match });
      })
      .catch(() => {
        Alert.alert("Card not found");
      });
  };

  const handleAdd = () => {
    if (!card) return;
    if (!recentCards.find((c) => c.id === card.id)) {
      setRecentCards([card, ...recentCards]);
    }
    const creature = scryfallCardToCreature(card);
    addCard!(creature);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#673ab7" }}>
      <View>
        <BottomSheetTextInput value={query} onChangeText={setQuery} />
        <Button
          onPress={onSearch}
          title="Search it"
          disabled={query.length < 1}
        />
      </View>
      {card && (
        <View>
          <Image
            source={{ uri: card.image_uris?.normal }}
            style={{ width: 150, height: 210 }}
          />
        </View>
      )}
      <View>
        <Button onPress={handleAdd} title="Add" disabled={!card} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // wrapper: {
  //   marginTop: 32,
  //   alignItems: "center",
  //   gap: 24,
  //   height: 650,
  // },
  // headerText: {
  //   fontSize: 24,
  //   textAlign: "center",
  // },
  // cardWrapper: {
  //   flexDirection: "column",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   gap: 12,
  //   height: 250,
  // },
  // cardImage: {
  //   width: 150,
  //   height: 210,
  // },
  // cardName: {
  //   fontSize: 18,
  //   textAlign: "center",
  // },
  // subHeader: {
  //   fontSize: 18,
  //   textAlign: "center",
  // },
  // recentCardContainer: {
  //   gap: 6,
  //   height: 125,
  // },
  // recentCardWrapper: {
  //   flexDirection: "column",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   gap: 6,
  //   height: 100,
  // },
  // recentCardImage: {
  //   width: 50,
  //   height: 75,
  // },
  // recentCardName: {
  //   fontSize: 12,
  //   textAlign: "center",
  //   maxWidth: 75,
  // },
  // input: {
  //   borderWidth: 1,
  //   borderRadius: 8,
  //   padding: 6,
  //   marginVertical: 12,
  //   width: 200,
  //   textAlign: "center",
  // },
  // addButton: {
  //   backgroundColor: "green",
  //   padding: 12,
  //   borderRadius: 8,
  // },
  // addButtonText: {
  //   color: "white",
  //   fontSize: 18,
  //   textAlign: "center",
  // },
});
