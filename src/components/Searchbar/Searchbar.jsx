import React from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
  const submitHandler = evt => {
    evt.preventDefault();
    onSubmit(evt.target.elements.searchField.value);
  };

  return (
    <header className={css.Searchbar}>
      <form onSubmit={submitHandler} className={css.SearchForm}>
        <button type="submit" className={css.SearchForm__button}>
          <span className={css.SearchForm__buttonLabel}>Search</span>
        </button>
        <input
          type="text"
          className={css.SearchForm__input}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="searchField"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
