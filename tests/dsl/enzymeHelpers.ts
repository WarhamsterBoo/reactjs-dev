import { ReactWrapper } from "enzyme";

export const simulateChange = (
  element: ReactWrapper<any, any>,
  value: unknown
) =>
  element.simulate("change", {
    target: { value },
  });
