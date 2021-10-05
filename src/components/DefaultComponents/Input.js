import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

function Input(props) {
  const {
    className,
    handleChange,
    label,
    name,
    placeholder,
    testId,
    type,
    value,
  } = props;

  return (
    <Form.Group className="mb-3" controlId={ name }>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={ type }
        className={ className }
        data-testid={ testId }
        name={ name }
        onChange={ handleChange }
        placeholder={ placeholder }
        value={ value }
      />
    </Form.Group>
  );
}

const { func, string, number, oneOfType } = PropTypes;
Input.propTypes = {
  className: string,
  handleChange: func.isRequired,
  label: string.isRequired,
  name: string.isRequired,
  placeholder: string,
  testId: string,
  type: string.isRequired,
  value: oneOfType([string, number]).isRequired,
};

Input.defaultProps = {
  className: '',
  placeholder: '',
  testId: '',
};

export default Input;
