import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import profileIcon from '../images/profileIcon.svg';

function HeaderWithoutSearch({ children }) {
  const history = useHistory();

  return (
    <header className="header">
      <h2 data-testid="page-title">{ children }</h2>
      <Button type="button" onClick={ () => history.push('/perfil') }>
        <img
          className="icon"
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="ícone de perfil"
        />
      </Button>
    </header>
  );
}
HeaderWithoutSearch.defaultProps = {
  children: undefined,
};

HeaderWithoutSearch.propTypes = {
  children: PropTypes.node,
};

// dsdsa
export default HeaderWithoutSearch;
