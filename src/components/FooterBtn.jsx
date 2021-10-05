import React from 'react';
import { Button } from 'react-bootstrap';
import { Redirect, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import useRedirect from '../hooks/useRedirect';

function FooterBtn({ to, src, testid, alt }) {
  const { shouldRedirect, redirect } = useRedirect();
  const { location: { pathname } } = useHistory();

  if (redirect.should) return <Redirect to={ redirect.path } />;

  return (
    <Button
      onClick={ () => shouldRedirect(to) }
      className={ pathname.includes(to) ? 'currLocBtn' : '' }
    >
      <img
        type="img"
        src={ src }
        alt={ alt }
        data-testid={ testid }
        className="icon"
      />
    </Button>
  );
}

FooterBtn.propTypes = {
  to: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  testid: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default FooterBtn;
