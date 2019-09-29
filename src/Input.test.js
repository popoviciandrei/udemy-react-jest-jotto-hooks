import React from "react";
import { mount } from "enzyme";

import Input from "./Input";
import languageContex from "./contexts/languageContext";
import { findByTestAttr, checkProps } from "../test/testUtils";

const setup = ({ language, secretWord }) => {
  language = language || "en";
  secretWord = secretWord || "party";

  return mount(
    <languageContex.Provider value={language}>
      <Input secretWord={secretWord} />
    </languageContex.Provider>
  );
};

test("Input renders without errors", () => {
  const wrapper = setup({});
  const component = findByTestAttr(wrapper, "component-input");
  expect(component.length).toBe(1);
});

test("does not throw warning with expected props", () => {
  checkProps(Input, { secretWord: "party" });
});

describe("state controlled input field", () => {
  let mockSetCurrentGuess = jest.fn();
  let wrapper;
  beforeEach(() => {
    mockSetCurrentGuess.mockClear();
    React.useState = jest.fn(() => ["", mockSetCurrentGuess]);

    wrapper = setup({});
  });

  test("state updates with value of input box upon change", () => {
    const inputBox = findByTestAttr(wrapper, "input-box");

    // Mock the change of inputBox value event
    const mockEvent = { target: { value: "train" } };
    inputBox.simulate("change", mockEvent);

    expect(mockSetCurrentGuess).toHaveBeenCalledWith("train");
  });

  test("state clears currentGuess on submit", () => {
    const submitButton = findByTestAttr(wrapper, "submit-button");

    submitButton.simulate("click", { preventDefault: () => {} });
    expect(mockSetCurrentGuess).toHaveBeenCalledWith("");
  });
});

describe("languagePicker", () => {
  describe("render submit button", () => {
    test("correctly renders submit string in english", () => {
      const wrapper = setup({});
      const submitButton = findByTestAttr(wrapper, "submit-button");
      expect(submitButton.text()).toBe("Submit");
    });

    test("correctly renders submit string in emoji", () => {
      const wrapper = setup({ language: "emoji" });
      const submitButton = findByTestAttr(wrapper, "submit-button");
      expect(submitButton.text()).toBe("🚀");
    });
  });

  describe("render the placeholder", () => {
    test("correctly renders input placeholder in english", () => {
      const wrapper = setup({});
      const inputBox = findByTestAttr(wrapper, "input-box");
      expect(inputBox.props().placeholder).toBe("enter guess");
    });

    test("correctly render input placeholder in emoji", () => {
      const wrapper = setup({ language: "emoji" });
      const inputBox = findByTestAttr(wrapper, "input-box");
      expect(inputBox.props().placeholder).toBe("mmm🤔");
    });
  });
});
