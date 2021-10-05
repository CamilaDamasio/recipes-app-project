import React from 'react';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';

function RadiosButton(props) {
  const { handleChange, radios, value, name } = props;

  return (
    <>
      {
        radios.map((radio) => {
          const { textId = '', valueRadio } = radio;

          return (
            <label htmlFor={ valueRadio } key={ v4() }>
              <input
                checked={ value === valueRadio }
                data-testid={ textId }
                name={ name }
                id={ valueRadio }
                onChange={ handleChange }
                type="radio"
                value={ valueRadio }
              />
              { valueRadio }
            </label>
          );
        })
      }
    </>
  );
}

const { func, string, arrayOf, objectOf } = PropTypes;
RadiosButton.propTypes = {
  handleChange: func.isRequired,
  name: string.isRequired,
  radios: arrayOf(objectOf(string)).isRequired,
  value: string.isRequired,
};

export default RadiosButton;
