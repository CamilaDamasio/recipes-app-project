import { useState } from 'react';

const useRedirect = () => {
  const [redirect, setRedirect] = useState({
    should: false,
    path: '',
  });

  const shouldRedirect = (path) => {
    setRedirect({
      ...redirect,
      should: true,
      path,
    });
  };

  return {
    shouldRedirect, redirect,
  };
};

export default useRedirect;
