import React from 'react';
import PropTypes from 'prop-types';

const GuessedWords = (props) => {
    let contents;
    if (props.guessedWords.length === 0) {
        contents = (
            <span data-test="guess-instructions">
                Try to guess the secret word!
            </span>
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
                <td data-test='total-guesses'>Total guesses: {props.guessedWords.length}</td>
            </tr >);

        contents = (
            <div data-test="guessed-words">
                <h3>Guessed Words</h3>
                <table className="table table-sm table-light table-bordered">
                    <thead className="thead-light">
                        <tr>
                            <th>#</th>
                            <th>Guess</th>
                            <th>Mathcing letters</th>
                        </tr>
                    </thead>
                    <tbody>
                        {guessedWordRows}
                    </tbody>
                    <tfoot>
                        {guessedWordCounter}
                    </tfoot>
                </table>
            </div>
        );
    }

    return (
        <div data-test="component-guessed-words">
            {contents}
        </div>
    )
};

GuessedWords.propTypes = {
    guessedWords: PropTypes.arrayOf(
        PropTypes.shape({
            guessedWord: PropTypes.string.isRequired,
            letterMatchCount: PropTypes.number.isRequired
        })
    ).isRequired

}

export default GuessedWords;