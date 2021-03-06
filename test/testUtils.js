import checkPropTypes from "check-prop-types";
// import { createStore, applyMiddleware } from "redux";

// import rootReducer from "../src/reducers";
// import { middlewares } from "../src/configureStore";

/**
 * Create a testing store with imported reducers, middleware and initial state.
 * globals: rootReducers, middlewares
 * @param {object} initialState
 * @function storeFactory
 * @returns {Store} - Redux store
 */
export const storeFactory = initialState => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(
    createStore
  );
  return createStoreWithMiddleware(rootReducer, initialState);
};
/**
 * Return node(s) with the give data-test attribute.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper.
 * @param {string} val - Value of data-test attribute for search.
 * @return {ShallowWrapper}
 */
export const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};

/**
 * Throw error if conformingProps do not pass propTypes validation.
 * 
 * @param {React.Component} component - Component to check props agains
 * @param {object} conformingProps - Props we expect to conform to defined propTypes
 */
export const checkProps = (component, conformingProps) => {
  const propError = checkPropTypes(
    component.propTypes,
    conformingProps,
    "prop",
    component.name
  );
  expect(propError).toBeUndefined();
};
