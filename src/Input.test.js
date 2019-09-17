import React from 'react';
import {shallow} from 'enzyme';

import Input from './Input';

import { findByTestAttr } from '../test/testUtils';

test('Input renders without errors', () => {
    const wrapper = shallow(<Input />);
    const component = findByTestAttr(wrapper, 'component-input');

    expect(component.length).toBe(1);
})