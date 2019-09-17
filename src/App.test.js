import React from 'react';
import { shallow} from 'enzyme';
import App from './App';

import {findByTestAttr} from '../test/testUtils';

/**
 * Setup function for app component.
 * @returns {ShallowWrapper}
 */
const setup = () => {
  return shallow(<App />);
}

test('App renders withot error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-app');

  expect(component.length).toBe(1);
});