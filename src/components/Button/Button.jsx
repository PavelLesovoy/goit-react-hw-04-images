import React, { Component } from 'react';
import css from './Button.module.css';
import PropTypes from 'prop-types';

export class Button extends Component {
  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button className={css.Button} onClick={this.props.onClick}>
          Load More
        </button>
      </div>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func,
};
