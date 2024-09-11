import { useState } from "react";
import { Button, Modal, View } from "react-native";
import { Creature } from "./DraggableCreatureBoard";
import { AddCreature } from "./AddCreature";

type AddCreatureModalProps = {
  onAdd: (creature: Creature) => void;
};

export const AddCreatureModal = ({ onAdd }: AddCreatureModalProps) => {
  const [addModalOpen, setAddModalOpen] = useState(false);

  return (
    <View>
      <Modal
        animationType="slide"
        visible={addModalOpen}
        onRequestClose={() => {
          setAddModalOpen(!addModalOpen);
        }}
        presentationStyle="formSheet"
      >
        <AddCreature
          onAdd={(creature) => {
            onAdd(creature);
            setAddModalOpen(false);
          }}
        />
        <Button title="Back" onPress={() => setAddModalOpen(false)} />
      </Modal>

      <View>
        <Button title="Add Creature" onPress={() => setAddModalOpen(true)} />
      </View>
    </View>
  );
};
