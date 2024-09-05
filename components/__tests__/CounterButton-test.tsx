import * as React from "react";
import { render } from "@testing-library/react-native";

import { CounterButton } from "../CounterButton";

it(`renders correctly`, () => {
  const tree = render(
    <CounterButton title="+1" numCounters={1} onPress={() => {}} />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
