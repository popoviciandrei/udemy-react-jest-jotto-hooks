import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr, checkProps } from "../test/testUtils";
import Congrats from "./Congrats";

const defaultProps = { success: false, secretWord: "" };

/**
 * Factory function to create ShallowWrapper for the Congrats component.
 *
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<Congrats {...setupProps} />);
};

test("renders without error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "component-congrats");
  expect(component.length).toBe(1);
});

test("renders no text when `success` prop is false", () => {
  const wrapper = setup({ success: false });
  const component = findByTestAttr(wrapper, "component-congrats");
  expect(component.text()).toBe("");
});

test("renders non-empty congrats message when `success` prop is true", () => {
  const wrapper = setup({ success: true });
  const message = findByTestAttr(wrapper, "congrats-message");
  expect(message.text().length).not.toBe(0);
});

test("does not throw warning with expected props", () => {
  const expectedProps = { success: false, secretWord: "" };
  const wrapper = setup(expectedProps);
  checkProps(wrapper, expectedProps);
});

test("success message shows the success word", () => {
  const secretWord = "party";
  const wrapper = setup({ success: true, secretWord });
  const message = findByTestAttr(wrapper, "congrats-message");
  expect(message.text()).toContain(secretWord);
});

test("give up shows the secret word and warning", () => {
  const secretWord = "party";
  const wrapper = setup({ secretWord, giveUp: true });

  const message = findByTestAttr(wrapper, "giveup-message");
  expect(message.text()).toContain(secretWord);
});