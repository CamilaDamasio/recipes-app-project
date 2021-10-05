import { useEffect, useState } from 'react';

const useValidation = () => {
  const [data, setData] = useState({ email: '', password: '' });
  const [validate, setValidate] = useState(false);

  const validator = () => {
    const SIX = 6;
    const EMAIL_REGEX = /^[a-z0-9_.]+@[a-z0-9]+\.[a-z]{2,3}(?:\.[a-z]{2})?$/;
    setValidate(EMAIL_REGEX.test(data.email) && data.password.length > SIX);
  };

  const handleChange = ({ target }) => {
    setData({
      ...data,
      [target.name]: target.value,
    });
  };

  useEffect(validator, [data.email, data.password]);

  return {
    validate, handleChange, data,
  };
};

export default useValidation;
