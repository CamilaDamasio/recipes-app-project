import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Redirect } from 'react-router';
import useLogin from '../hooks/useLogin';
import useRedirect from '../hooks/useRedirect';
import useValidation from '../hooks/useValidation';

function Login() {
  const { handleChange, validate, data } = useValidation();

  const handleSubmit = useLogin();

  const { shouldRedirect, redirect } = useRedirect();

  if (redirect.should) return <Redirect to={ redirect.path } />;

  return (
    <Form className="login">
      <div className="inputs">
        <Form.Group className="mb-3" controlId="email-input">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Enter e-mail"
            data-testid="email-input"
            onChange={ handleChange }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password-input">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Enter password"
            data-testid="password-input"
            onChange={ handleChange }
          />
        </Form.Group>
        <Button
          variant="primary"
          data-testid="login-submit-btn"
          disabled={ !validate }
          onClick={ () => {
            shouldRedirect('/comidas');
            handleSubmit(data.email);
          } }
        >
          Entrar
        </Button>
      </div>
    </Form>
  );
}

export default Login;
