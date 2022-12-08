import React, { Component } from 'react';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  render() {
    return this.props.images.map(({ id, webformatURL, tags }) => {
      return (
        <li key={id} className={css.ImageGalleryItem}>
          <img
            className={css.ImageGalleryItem__image}
            src={webformatURL}
            alt={tags}
            onClick={() => this.props.onClick(id)}
          />
        </li>
      );
    });
  }
}

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape),
  onClick: PropTypes.func,
};
