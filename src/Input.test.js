import React from 'react';
import {shallow} from 'enzyme';

import Input from './Input';

import { findByTestAttr, checkProps } from '../test/testUtils';

const setup = (secretWord = 'party') => {
    return shallow(<Input secretWord={secretWord} />, )
}

test('Input renders without errors', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'component-input');
    expect(component.length).toBe(1);
})

test('does not throw warning with expected props', () => {
    checkProps(Input, {secretWord: 'party'})
})