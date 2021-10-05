import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

function MyButton(props) {
  const {
    className,
    disabled,
    handleClick,
    name,
    testId,
  } = props;

  return (
    <Button
      className={ className }
      disabled={ disabled }
      data-testid={ testId }
      onClick={ handleClick }
      type="button"
    >
      { name }
    </Button>
  );
}

const { bool, func, string, oneOfType } = PropTypes;
MyButton.propTypes = {
  className: oneOfType([bool, string]),
  disabled: bool,
  handleClick: func.isRequired,
  name: string.isRequired,
  testId: string,
};

MyButton.defaultProps = {
  className: '',
  disabled: false,
  testId: '',
};

export default MyButton;
