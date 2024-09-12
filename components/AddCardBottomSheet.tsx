import React, { useMemo, useRef } from "react";
import {
  createStackNavigator,
  StackNavigationOptions,
  TransitionPresets,
} from "@react-navigation/stack";
import BottomSheet, { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { NavigationContainer } from "@react-navigation/native";
import { Recent } from "@/components/add_card_bottom_sheet/Recent";
import { Search } from "@/components/add_card_bottom_sheet/Search";
import { AddCardContext } from "@/contexts/AddCard";
import { AddCardRoot } from "@/components/add_card_bottom_sheet/AddCardRoot";
import { Creature } from "@/types/creature";

const Stack = createStackNavigator();

export type RootStackParamList = {
  "Add Card": undefined;
  Search: undefined;
  Recent: undefined;
};

type AddCardBottomSheetProps = {
  onAddCard: (card: Creature) => void;
};

export const AddCardBottomSheet = ({ onAddCard }: AddCardBottomSheetProps) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["20%", "70%"], []);
  const screenOptions = useMemo<StackNavigationOptions>(
    () => ({
      ...TransitionPresets.SlideFromRightIOS,
      headerMode: "screen",
      headerShown: true,
      safeAreaInsets: { top: 0 },
      cardStyle: {
        backgroundColor: "white",
        overflow: "visible",
      },
    }),
    []
  );

  return (
    <BottomSheetModalProvider>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        enableDynamicSizing={false}
        snapPoints={snapPoints}
        animateOnMount={true}
      >
        <AddCardContext.Provider value={{ addCard: onAddCard }}>
          <NavigationContainer independent={true}>
            <Stack.Navigator screenOptions={screenOptions}>
              <Stack.Screen
                name="Add Card"
                options={{
                  ...screenOptions,
                  headerBackTitleVisible: false,
                  headerMode: "float",
                }}
                component={AddCardRoot}
              />
              <Stack.Screen name="Search" component={Search} />
              <Stack.Screen name="Recent" component={Recent} />
            </Stack.Navigator>
          </NavigationContainer>
        </AddCardContext.Provider>
      </BottomSheet>
    </BottomSheetModalProvider>
  );
};
