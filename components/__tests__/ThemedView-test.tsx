import * as React from "react";
import { render } from "@testing-library/react-native";

import { ThemedView } from "../ThemedView";

it(`renders correctly`, () => {
  const tree = render(<ThemedView>Snapshot test!</ThemedView>).toJSON();

  expect(tree).toMatchSnapshot();
});
