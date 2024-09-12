import { getCard } from "@/lib/scryfall";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useAsyncStorage } from "@/hooks/useAsyncStorage";
import { ScryfallCard } from "@/types/scryfall";
import { Creature } from "@/types/creature";

type AddCreatureProps = {
  onAdd: (creature: Creature) => void;
};

const defaultCreatureName = "Greg";

export const AddCreature = ({ onAdd }: AddCreatureProps) => {
  const [counters, setCounters] = useState(0);
  const [name, setName] = useState("");
  const [card, setCard] = useState<ScryfallCard | null>(null);
  const [recentCards, setRecentCards] = useAsyncStorage<ScryfallCard[]>(
    "recentCards",
    []
  );

  useEffect(() => {
    if (card && !recentCards.find((c) => c.id === card.id)) {
      setRecentCards([card, ...recentCards]);
    }
  }, [card]);

  const onSearch = async () => {
    Keyboard.dismiss();
    getCard(name)
      .then((match) => {
        if (!match.id) throw new Error();
        setCard(match);
      })
      .catch(() => {
        Alert.alert("Card not found");
      });
  };

  const handleAdd = () => {
    const id = card?.id || uuid.v4().toString();
    onAdd({
      id,
      key: uuid.v4().toString(),
      name: card?.name || defaultCreatureName,
      imageUrl: card?.image_uris?.art_crop,
      numCounters: counters,
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 95 : 70}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <View style={styles.wrapper}>
          <Text style={styles.headerText}>Add Creature</Text>
          <View>
            <Text style={styles.subHeader}>Search Card (optional)</Text>
            {recentCards.length > 0 && (
              <View style={styles.recentCardContainer}>
                <Text style={styles.subHeader}>Recent Cards</Text>
                <ScrollView horizontal>
                  {recentCards.map((card) => (
                    <TouchableOpacity
                      key={card.id}
                      onPress={() => setCard(card)}
                    >
                      <View style={styles.recentCardWrapper}>
                        <Image
                          style={styles.recentCardImage}
                          source={{
                            uri: card.image_uris?.normal,
                          }}
                        />
                        <Text numberOfLines={1} style={styles.recentCardName}>
                          {card.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
            <TextInput
              style={styles.input}
              inputMode="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.nativeEvent.text)}
            />
            <Button title="Search" onPress={onSearch} />
            {card && (
              <View style={styles.cardWrapper}>
                <Text style={styles.cardName}>{card.name}</Text>
                <Image
                  style={styles.cardImage}
                  source={{
                    uri: card.image_uris?.normal,
                  }}
                />
              </View>
            )}
          </View>
          <View>
            <Text style={styles.subHeader}>Current Counters</Text>
            <TextInput
              style={styles.input}
              inputMode="numeric"
              returnKeyType="done"
              value={counters.toString()}
              onChange={(e) => setCounters(parseInt(e.nativeEvent.text || "0"))}
            />
          </View>
          <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
            <Text style={styles.addButtonText}>Add Creature</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 32,
    alignItems: "center",
    gap: 24,
    height: 650,
  },
  headerText: {
    fontSize: 24,
    textAlign: "center",
  },
  cardWrapper: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    height: 250,
  },
  cardImage: {
    width: 150,
    height: 210,
  },
  cardName: {
    fontSize: 18,
    textAlign: "center",
  },
  subHeader: {
    fontSize: 18,
    textAlign: "center",
  },
  recentCardContainer: {
    gap: 6,
    height: 125,
  },
  recentCardWrapper: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    height: 100,
  },
  recentCardImage: {
    width: 50,
    height: 75,
  },
  recentCardName: {
    fontSize: 12,
    textAlign: "center",
    maxWidth: 75,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 6,
    marginVertical: 12,
    width: 200,
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "green",
    padding: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});
