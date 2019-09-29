import React from "react";
import { shallow, mount } from "enzyme";

import guessedWordsContext from "./guessedWordsContext";

const FunctionalComponent = () => {
  guessedWordsContext.useGuessedWords();
  return <div />;
};

test("useGuessedWords component throws error when not wrapped in GuessWordsProvider", () => {
  expect(() => {
    shallow(<FunctionalComponent />);
  }).toThrow("useGuessedWords must be used within a GuessedWordsProvider");
});

test("useGuessedWords component does not throws error when wrapped in GuessWordsProvider", () => {
  expect(() => {
    mount(
      <guessedWordsContext.GuessedWordsProvider>
        <FunctionalComponent />
      </guessedWordsContext.GuessedWordsProvider>
    );
  }).not.toThrow();
});
