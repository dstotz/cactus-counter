import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Button,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from "react-native";
import DraggableGrid from "react-native-draggable-grid";
import { AddCreatureModal } from "./AddCreatureModal";
import { CreaturesWithActiveAbilities } from "./CreaturesWithActiveAbilities";
import { Card } from "@/lib/counterModifiers";
import { activatedAbilityCounterCalc } from "@/lib/counterCalc";
import { counterTextFormat } from "@/lib/counterTextFormat";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAsyncStorage } from "@/hooks/useAsyncStorage";

export type Creature = {
  name?: string;
  id: string;
  key: string;
  numCounters: number;
  imageUrl?: string;
};

type DraggableCreatureBoardProps = {
  onAddCreature?: (creature: Creature) => void;
  onRemoveCreature?: (creature: Creature) => void;
};

export const DraggableCreatureBoard = ({
  onAddCreature,
  onRemoveCreature,
}: DraggableCreatureBoardProps) => {
  const [selected, setSelected] = useState<Creature | undefined>();
  const [numColumns, setNumColumns] = useState(4);
  // const [data, setData] = useState<Creature[]>([
  //   { id: "1", key: "1", numCounters: 0 },
  //   { id: "2", key: "2", numCounters: 0 },
  //   { id: "3", key: "3", numCounters: 0 },
  //   { id: "4", key: "4", numCounters: 0 },
  //   { id: "5", key: "5", numCounters: 0 },
  //   { id: "6", key: "6", numCounters: 0 },
  //   { id: "7", key: "7", numCounters: 0 },
  //   { id: "8", key: "8", numCounters: 0 },
  //   { id: "9", key: "9", numCounters: 0 },
  //   { id: "10", key: "10", numCounters: 0 },
  // ]);
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [data, setData] = useAsyncStorage<Creature[]>("creatures", []);

  useEffect(() => {
    const usableWidth = width - insets.left - insets.right;
    const newNumColumns = Math.floor(usableWidth / 90);
    setNumColumns(newNumColumns);
  }, [width, insets]);

  const removeCreature = (creature: Creature) => {
    const newData = data.filter((c) => c !== creature);
    setData(newData);
    if (onRemoveCreature) {
      onRemoveCreature(creature);
    }
  };

  const addCreature = (creature: Creature) => {
    const newData = [...data, creature];
    setData(newData);
    if (onAddCreature) {
      onAddCreature(creature);
    }
  };

  const renderItem = (creature: Creature) => {
    return (
      <View
        style={[
          styles.item,
          selected === creature ? styles.itemSelected : undefined,
        ]}
        key={creature.id}
      >
        {creature.imageUrl && (
          <ImageBackground
            source={{ uri: creature.imageUrl }}
            style={styles.itemImageBackground}
            imageStyle={styles.itemImageBackground}
          />
        )}
        {selected === creature && (
          <TouchableOpacity
            style={styles.itemRemoveButton}
            onPress={() => removeCreature(creature)}
          >
            <Ionicons
              style={styles.itemRemoveButton}
              name="close"
              size={28}
              color="white"
            />
            <Ionicons
              style={styles.itemRemoveButton}
              name="close-circle"
              size={28}
              color="black"
            />
          </TouchableOpacity>
        )}
        <View style={styles.itemCounterTextWrapper}>
          <Text numberOfLines={1} style={styles.itemCounterText}>
            {counterTextFormat(creature.numCounters)}
          </Text>
          <Text numberOfLines={1} style={styles.itemCounterLabelText}>
            +1/+1
          </Text>
          <Text numberOfLines={1} style={styles.itemNameText}>
            {creature.name}
          </Text>
        </View>
      </View>
    );
  };

  const handleAddCounters = (numCounters: number) => {
    if (selected) {
      const newData = data.map((item) => {
        if (item === selected) {
          const newSelected = {
            ...selected,
            numCounters: selected.numCounters + numCounters,
          };
          setSelected(newSelected);
          return newSelected;
        }
        return item;
      });
      setData(newData);
    } else {
      const newData = data.map((item) => ({
        ...item,
        numCounters: item.numCounters + numCounters,
      }));
      setData(newData);
    }
  };

  const handleActivation = (card: Card) => {
    const newData = data.map((creature) => {
      const newCounters = activatedAbilityCounterCalc(
        card,
        creature.numCounters
      );
      return { ...creature, numCounters: creature.numCounters + newCounters };
    });
    setData(newData);
  };

  const removeAllCounters = () => {
    const newData = data.map((creature) => {
      return { ...creature, numCounters: 0 };
    });
    setData(newData);
  };

  return (
    <TouchableWithoutFeedback onPress={() => setSelected(undefined)}>
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.boardActionButtonsWrapper}>
          <Button title="Remove all counters" onPress={removeAllCounters} />
          <Text style={{ fontSize: 24 }}>|</Text>
          <Button title="Clear the board" onPress={() => setData([])} />
        </View>
        <View style={styles.dragWrapper}>
          {data.length === 0 && (
            <Text style={styles.helperText}>
              Add a creature below to get started!
            </Text>
          )}
          <DraggableGrid
            delayLongPress={100}
            numColumns={numColumns}
            renderItem={renderItem}
            data={data}
            onDragRelease={(newData) => {
              setData(newData);
            }}
            onDragItemActive={(creature) => {
              setSelected(creature);
            }}
            onItemPress={(creature) => {
              setSelected((current) =>
                current === creature ? undefined : creature
              );
            }}
          />
        </View>
        <View>
          <CreaturesWithActiveAbilities
            creatures={data}
            onActivate={handleActivation}
          />
        </View>
        <View>
          <View style={styles.counterButtonWrapper}>
            {[-10, -1, 1, 10].map((numCounters) => (
              <CounterInncrementorButton
                disabled={data.length === 0}
                key={numCounters}
                numCounters={numCounters}
                onPress={handleAddCounters}
              />
            ))}
          </View>
          {data.length > 0 && (
            <Text style={styles.counterButtonApplyText}>
              Add to{" "}
              {selected?.name ||
                (selected && "this creature") ||
                "all creatures"}
            </Text>
          )}
        </View>
        <View>
          <AddCreatureModal onAdd={addCreature} />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const CounterInncrementorButton = ({
  disabled,
  numCounters,
  onPress,
}: {
  disabled?: boolean;
  numCounters: number;
  onPress: (numCounters: number) => void;
}) => {
  return (
    <TouchableOpacity
      style={[styles.counterButton, disabled && styles.counterButtonDisabled]}
      disabled={disabled}
      onPress={() => onPress(numCounters)}
    >
      <Text style={styles.counterButtonText}>
        {numCounters > 0 && "+"}
        {numCounters}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  dragWrapper: {
    minHeight: 275,
    justifyContent: "center",
  },
  boardActionButtonsWrapper: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    gap: 12,
    padding: 12,
  },
  helperText: {
    fontSize: 22,
    textAlign: "center",
    margin: 16,
    color: "brown",
  },
  item: {
    width: 90,
    height: 90,
    backgroundColor: "honeydew",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 1,
  },
  itemSelected: {
    shadowColor: "green",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 14,
  },
  itemCounterTextWrapper: {
    flexDirection: "column",
    textAlign: "center",
    gap: 4,
  },
  itemCounterText: {
    fontSize: 23,
    color: "darkgreen",
    textAlign: "center",
    textShadowColor: "white",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  itemCounterLabelText: {
    fontSize: 12,
    textAlign: "center",
    color: "black",
    textShadowColor: "white",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    alignContent: "flex-end",
  },
  itemNameText: {
    fontSize: 14,
    textAlign: "center",
    color: "black",
    textShadowColor: "white",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  itemImageBackground: {
    width: 90,
    height: 90,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    opacity: 0.55,
    backgroundColor: "white",
  },
  itemRemoveButton: {
    position: "absolute",
    top: -5,
    right: -5,
  },
  counterButton: {
    width: 75,
    height: 75,
    backgroundColor: "green",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  counterButtonDisabled: {
    opacity: 0.5,
  },
  counterButtonAll: {
    backgroundColor: "brown",
  },
  counterButtonText: {
    fontSize: 24,
    color: "#FFFFFF",
  },
  counterButtonApplyText: {
    paddingTop: 12,
    fontSize: 18,
    textAlign: "center",
  },
  counterButtonWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
