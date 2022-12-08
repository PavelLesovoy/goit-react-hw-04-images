import React, { Component } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  submitHandler = evt => {
    evt.preventDefault();
    this.props.onSubmit(evt.target.elements.searchField.value);
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form onSubmit={this.submitHandler} className={css.SearchForm}>
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
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
