import React from "react";

const guessedWordsContext = React.createContext();

/**
 * @function useGuessedWords
 * @returns {array} guessedWordsValue, which is a state of [value, setter]
 */
const useGuessedWords = () => {
  const context = React.useContext(guessedWordsContext);
  if (!context) {
    throw new Error(
      "useGuessedWords must be used within a GuessedWordsProvider"
    );
  }

  return context;
};

const GuessedWordsProvider = props => {
  const [guessedWords, setGuessedWords] = React.useState([]);
  const value = React.useMemo(() => [guessedWords, setGuessedWords], [
    guessedWords
  ]);

  return <guessedWordsContext.Provider value={value} {...props} />;
};

export default {
  GuessedWordsProvider,
  useGuessedWords
};
