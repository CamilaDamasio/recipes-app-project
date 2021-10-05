import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import clipboardCopy from '../utils/clipboardCopy';
import shareIcon from '../images/shareIcon.svg';

function ShareBtn({ id, type }) {
  return (
    <div className="share-btn">
      <Button
        type="button"
        className="btn-share"
        onClick={ () => clipboardCopy(type, id) }
        data-testid="share-btn"
      >
        <img
          src={ shareIcon }
          alt="Share Icon"
          className="share-icon"
        />
      </Button>
      <span
        id={ `copyMessage${id}` }
        className="share-txt"
      >
        Compartilhar
      </span>
    </div>
  );
}

ShareBtn.propTypes = {
  id: PropTypes.number,
  type: PropTypes.string,
}.isRequired;

export default ShareBtn;
