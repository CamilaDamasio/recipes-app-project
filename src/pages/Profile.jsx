import React from 'react';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';
import useLogout from '../hooks/useLogout';
import useRedirect from '../hooks/useRedirect';
import Footer from '../components/Footer';
import '../styles/styles_css/Profile.css';

function Profile() {
  const storageUser = JSON.parse(localStorage.getItem('user'));

  const { redirect, shouldRedirect } = useRedirect();

  const handleLogout = useLogout();

  if (redirect.should) return <Redirect to={ redirect.path } />;

  return (
    <div className="main-div">
      <HeaderWithoutSearch>Perfil</HeaderWithoutSearch>
      <div className="profile-body">

        <div className="profile-email">
          <p data-testid="profile-email">{localStorage.length && storageUser.email}</p>
        </div>
        <div className="profile-btns">

          <Button
            variant="success"
            data-testid="profile-done-btn"
            onClick={ () => shouldRedirect('/receitas-feitas') }
          >
            Receitas Feitas
          </Button>
          <Button
            variant="warning"
            data-testid="profile-favorite-btn"
            onClick={ () => shouldRedirect('/receitas-favoritas') }
          >
            Receitas Favoritas
          </Button>
          <Button
            variant="danger"
            data-testid="profile-logout-btn"
            onClick={ () => {
              shouldRedirect('/');
              handleLogout();
            } }
          >
            Sair
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
