import React from "react";

import { shallow } from "enzyme";
import { findByTestAttr } from "../test/testUtils";
import GuessedWords from "GuessedWords";

import guessedWordsContext from "./contexts/guessedWordsContext";

/**
 * @function setup
 * @param {array } guessedWords - guessedWords value
 */
const setup = (guessedWords = []) => {
  const mockUseGuessedWords = jest
    .fn()
    .mockReturnValue([guessedWords, jest.fn()]);
  guessedWordsContext.useGuessedWords = mockUseGuessedWords;
  return shallow(<GuessedWords />);
};

describe("if there are no words guessed", () => {
  let wrapper;
  // define wrapper that will be used by each sub test
  beforeEach(() => {
    wrapper = setup([]);
  });

  test("renders without errors", () => {
    const component = findByTestAttr(wrapper, "component-guessed-words");
    expect(component.length).toBe(1);
  });

  test("renders instructions to guess a word", () => {
    const instructions = findByTestAttr(wrapper, "guess-instructions");
    expect(instructions.text().length).not.toBe(0);
  });

  test("don`t render total no of guesses section", () => {
    const totalGuessedWords = findByTestAttr(wrapper, "total-guesses");
    expect(totalGuessedWords.length).toBe(0);
  });
});

describe("if there are words guessed", () => {
  let wrapper;
  const guessedWords = [
    { guessedWord: "train", letterMatchCount: 3 },
    { guessedWord: "agile", letterMatchCount: 1 },
    { guessedWord: "party", letterMatchCount: 5 }
  ];

  beforeEach(() => {
    wrapper = setup(guessedWords);
  });

  test("renders without error", () => {
    const component = findByTestAttr(wrapper, "component-guessed-words");
    expect(component.length).toBe(1);
  });

  test('renders "guess words" section', () => {
    const guessedWordsNode = findByTestAttr(wrapper, "guessed-words");
    expect(guessedWordsNode.length).toBe(1);
  });

  test("renders the corrent number of guessed words", () => {
    const guessedWords = findByTestAttr(wrapper, "guessed-word");
    expect(guessedWords.length).toBe(guessedWords.length);
  });

  test("renders total no of guesses section", () => {
    const totalGuessedWords = findByTestAttr(wrapper, "total-guesses");

    // element should be on the pate
    expect(totalGuessedWords.length).toBe(1);

    // element should containt the no of tries
    expect(totalGuessedWords.text()).toContain(guessedWords.length);
  });
});

describe("languagePicker", () => {
  test("correctly renders gues instructions string in english by default", () => {
    const wrapper = setup([]);
    const guessInstructions = findByTestAttr(wrapper, "guess-instructions");
    expect(guessInstructions.text()).toBe("Try to guess the secret word!");
  });
  test("correctly renders gues instructions string in emoji", () => {
    const mockUseContext = jest.fn().mockReturnValue("emoji");
    React.useContext = mockUseContext;

    const wrapper = setup();
    const guessInstructions = findByTestAttr(wrapper, "guess-instructions");
    expect(guessInstructions.text()).toBe("🤔🤫🔤");
  });
});
