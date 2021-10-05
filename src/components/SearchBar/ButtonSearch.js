import React from 'react';
import PropTypes from 'prop-types';
import MyButton from '../DefaultComponents/Button';

function ButtonSearch(props) {
  const { handleClick } = props;

  return (
    <MyButton
      handleClick={ handleClick }
      name="Search"
      testId="exec-search-btn"
    />
  );
}

const { func } = PropTypes;
ButtonSearch.propTypes = {
  handleClick: func.isRequired,
};

export default ButtonSearch;
