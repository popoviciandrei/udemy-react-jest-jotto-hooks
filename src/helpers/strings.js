const languageStrings = {
  en: {
    congrats: "Congratulationa! You guessed the word!",
    submit: "Submit",
    guessPrompt: "Try to guess the secret word!",
    guessInputPlaceholder: "enter guess",
    guessColumnHeader: "Guessed Words",
    guessedWords: "Guesses",
    matchingLettersColumnHeader: "Matching Letters"
  },
  emoji: {
    congrats: "😃",
    submit: "🚀",
    guessPrompt: "hmm",
    guessInputPlaceholder: "mmmm",
    guessColumnHeader: "don't know",
    guessedWords: "don't",
    matchingLettersColumnHeader: "checked"
  }
};

const getStringByLanguage = (
  languageCode,
  stringKey,
  strings = languageStrings
) => {
  if (!strings[languageCode] || !strings[languageCode][stringKey]) {
    // falback to english
    console.warn(`Could not get string [${stringKey}] for [${languageCode}]`);
    return strings["en"][stringKey];
  }

  return strings[languageCode][stringKey];
};

export default {
  getStringByLanguage
};
