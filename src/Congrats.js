import React from "react";
import PropTypes from "prop-types";

import languageContext from "./contexts/languageContext";
import stringsModule from "./helpers/strings";

/**
 * Function react component for congratualtory message.
 * @function
 * @param {object} props - React props.
 * @returns {JSX.Element} - Rendered component (or null if `success` prop is false)
 */
const Congrats = props => {
  const language = React.useContext(languageContext);

  if (props.success) {
    return (
      <div data-test="component-congrats" className="alert alert-success">
        <span data-test="congrats-message">
          {stringsModule.getStringByLanguage(language, "congrats")}
          {props.secretWord}
        </span>
      </div>
    );
  } else if (props.giveUp) {
    return (
      <div
        data-test="component-giveup"
        className="alert alert-danger"
        role="alert">
        <span data-test="giveup-message">
          The secret word was `{props.secretWord}`<br />
          Better luck next time!
        </span>
      </div>
    );
  } else {
    return <div data-test="component-congrats" />;
  }
};

Congrats.propTypes = {
  success: PropTypes.bool.isRequired,
  secretWord: PropTypes.string
};

export default Congrats;
