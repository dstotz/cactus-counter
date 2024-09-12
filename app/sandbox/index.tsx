import React, { useCallback } from "react";
import { AddCardBottomSheet } from "@/components/AddCardBottomSheet";
import { Creature } from "@/types/creature";

export default function Sandbox() {
  const onAddCard = useCallback((card: Creature) => {
    console.log("Adding card", card);
  }, []);

  return <AddCardBottomSheet onAddCard={onAddCard} />;
}
