import React from "react";
import PropTypes from "prop-types";

import languageContext from "./contexts/languageContext";
import stringModule from "./helpers/strings";

const GuessedWords = props => {
  const language = React.useContext(languageContext);

  let contents;

  const getString = key => {
    return stringModule.getStringByLanguage(language, key);
  };

  if (props.guessedWords.length === 0) {
    contents = (
      <span data-test="guess-instructions">{getString("guessPrompt")}</span>
    );
  } else {
    const guessedWordRows = props.guessedWords.map((word, index) => (
      <tr data-test="guessed-word" key={index}>
        <td>{index + 1}</td>
        <td>{word.guessedWord}</td>
        <td>{word.letterMatchCount}</td>
      </tr>
    ));

    const guessedWordCounter = (
      <tr>
        <td data-test="total-guesses">
          Total guesses: {props.guessedWords.length}
        </td>
      </tr>
    );

    contents = (
      <div data-test="guessed-words">
        <h3>Guessed Words</h3>
        <table className="table table-sm table-light table-bordered">
          <thead className="thead-light">
            <tr>
              <th>#</th>
              <th>{getString("guessColumnHeader")}</th>
              <th>{getString("matchingLettersColumnHeader")}</th>
            </tr>
          </thead>
          <tbody>{guessedWordRows}</tbody>
          <tfoot>{guessedWordCounter}</tfoot>
        </table>
      </div>
    );
  }

  return <div data-test="component-guessed-words">{contents}</div>;
};

GuessedWords.propTypes = {
  guessedWords: PropTypes.arrayOf(
    PropTypes.shape({
      guessedWord: PropTypes.string.isRequired,
      letterMatchCount: PropTypes.number.isRequired
    })
  ).isRequired
};

export default GuessedWords;
