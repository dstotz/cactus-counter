import * as React from "react";
import { render } from "@testing-library/react-native";

import { CounterInput } from "../CounterInput";

it(`renders correctly`, () => {
  const tree = render(<CounterInput value={5} onChange={() => {}} />).toJSON();

  expect(tree).toMatchSnapshot();
});
