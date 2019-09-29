import React from "react";
import { shallow, mount } from "enzyme";

import successContext from "./successContext";

const FunctionalComponent = () => {
  successContext.useSuccess();
  return <div />;
};

test("useSueccess component throws error when not wrapped in SuccessProvider", () => {
  expect(() => {
    shallow(<FunctionalComponent />);
  }).toThrow("useSuccess must be used within a SuccessProvider");
});

test("useSuccess does not throw error when wrapped in SuccessPRovider", () => {
  expect(() => {
    mount(
      <successContext.SuccessProvider>
        <FunctionalComponent />
      </successContext.SuccessProvider>
    );
  }).not.toThrow();
});
