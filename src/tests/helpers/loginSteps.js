import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  emailInputId,
  passwordInputId,
} from './mocks';

const loginSteps = (email, password) => {
  const emailInput = screen.getByTestId(emailInputId);
  const passwordInput = screen.getByTestId(passwordInputId);
  userEvent.type(emailInput, email);
  userEvent.type(passwordInput, password);
};

export default loginSteps;
