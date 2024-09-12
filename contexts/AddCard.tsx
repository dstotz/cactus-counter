import { Creature } from "@/types/creature";
import { createContext } from "react";

type AddCardContextType = {
  addCard?: (card: Creature) => void;
};

export const AddCardContext = createContext<AddCardContextType>({});
