import React from 'react';
import { shallow } from 'enzyme';
import { checkProps, findByTestAttr } from '../test/testUtils';
import GuessedWords from './GuessedWords';
import TestRunner from 'jest-runner';

const defaultProps = {
    guessedWords: [{ guessedWord: 'train', letterMatchCount: 3 }],
}

const setup = (props = {}) => {
    const setupProps = { ...defaultProps, ...props };
    return shallow(<GuessedWords {...setupProps} />);
}

test('does not throw warning with expected props', () => {
    checkProps(GuessedWords, defaultProps);
});

describe('if there are no words guessed', () => {
    let wrapper;
    // define wrapper that will be used by each sub test
    beforeEach(() => {
        wrapper = setup({ guessedWords: [] });
    });

    test('renders without errors', () => {
        const component = findByTestAttr(wrapper, 'component-guessed-words');
        expect(component.length).toBe(1);
    })

    test('renders instructions to guess a word', () => {
        const instructions = findByTestAttr(wrapper, 'guess-instructions');
        expect(instructions.text().length).not.toBe(0);
    })

    test('don`t render total no of guesses section', () => {
        const totalGuessedWords = findByTestAttr(wrapper, 'total-guesses');
        expect(totalGuessedWords.length).toBe(0);
    });

});

describe('if there are words guessed', () => {
    let wrapper;
    const guessedWords = [
        { guessedWord: 'train', letterMatchCount: 3 },
        { guessedWord: 'agile', letterMatchCount: 1 },
        { guessedWord: 'party', letterMatchCount: 5 },
    ];

    beforeEach(() => {
        wrapper = setup({ guessedWords });
    });

    test('renders without error', () => {
        const component = findByTestAttr(wrapper, 'component-guessed-words');
        expect(component.length).toBe(1);
    });

    test('renders "guess words" section', () => {
        const guessedWordsNode = findByTestAttr(wrapper, 'guessed-words');
        expect(guessedWordsNode.length).toBe(1);
    });

    test('renders the corrent number of guessed words', () => {
        const guessedWords = findByTestAttr(wrapper, 'guessed-word');
        expect(guessedWords.length).toBe(guessedWords.length);
    });

    test('renders total no of guesses section', () => {
        const totalGuessedWords = findByTestAttr(wrapper, 'total-guesses');

        // element should be on the pate
        expect(totalGuessedWords.length).toBe(1);

        // element should containt the no of tries
        expect(totalGuessedWords.text()).toContain(guessedWords.length);
    })
});