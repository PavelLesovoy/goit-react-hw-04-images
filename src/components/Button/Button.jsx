import React from 'react';
import css from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ onClick }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <button className={css.Button} onClick={onClick}>
        Load More
      </button>
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
};
