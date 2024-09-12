import { AddCardContext } from "@/contexts/AddCard";
import { useAsyncStorage } from "@/hooks/useAsyncStorage";
import { scryfallCardToCreature } from "@/lib/scryfall";
import { imageStyles } from "@/lib/styles";
import { ScryfallCard } from "@/types/scryfall";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useBottomSheetModal, BottomSheetFlatList } from "@gorhom/bottom-sheet";

export const Recent = () => {
  const { dismissAll } = useBottomSheetModal();
  const { addCard } = useContext(AddCardContext);
  const [recentCards, setRecentCards] = useAsyncStorage<ScryfallCard[]>(
    "recentCards",
    []
  );

  const handleRemove = (id: string) => {
    setRecentCards(recentCards.filter((card) => card.id !== id));
  };

  const handleSelect = (id: string) => {
    const card = recentCards.find((card) => card.id === id);
    if (!card) return;
    const creature = scryfallCardToCreature(card);
    addCard!(creature);
    dismissAll(); // Figure out why this doesn't work
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#673ab7",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <BottomSheetFlatList
        data={recentCards}
        keyExtractor={(card) => card.id}
        centerContent={true}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity onPress={() => handleSelect(item.id)}>
              <TouchableOpacity
                style={{ position: "absolute", top: 0, right: 0, zIndex: 1 }}
                onPress={() => handleRemove(item.id)}
              >
                <Ionicons name="close" size={24} color="white" />
              </TouchableOpacity>
              <CardImage card={item} />
              <Text>{item.name}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const CardImage = ({ card }: { card: ScryfallCard }) => {
  return card.image_uris?.normal ? (
    <Image style={imageStyles.card} source={{ uri: card.image_uris?.normal }} />
  ) : (
    <Image
      style={imageStyles.card}
      source={require("@/assets/images/mtg_card_not_found.png")}
    />
  );
};
