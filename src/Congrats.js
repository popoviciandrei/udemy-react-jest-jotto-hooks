import React from "react";
import PropTypes from "prop-types";

import successContext from "./contexts/successContext";
import languageContext from "./contexts/languageContext";
import stringsModule from "./helpers/strings";

/**
 * Function react component for congratualtory message.
 * @function
 * @returns {JSX.Element} - Rendered component (or null if `success` prop is false)
 */
const Congrats = props => {
  const language = React.useContext(languageContext);
  const [success] = successContext.useSuccess();

  if (success) {
    return (
      <div data-test="component-congrats" className="alert alert-success">
        <span data-test="congrats-message">
          {stringsModule.getStringByLanguage(language, "congrats")}
          {props.secretWord}
        </span>
      </div>
    );
  } else {
    return <div data-test="component-congrats" />;
  }
};

Congrats.propTypes = {
  secretWord: PropTypes.string
};

export default Congrats;
