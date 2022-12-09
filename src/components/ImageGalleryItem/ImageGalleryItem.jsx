import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ images, onClick }) => {
  return images.map(({ id, webformatURL, tags }) => {
    return (
      <li key={id} className={css.ImageGalleryItem}>
        <img
          className={css.ImageGalleryItem__image}
          src={webformatURL}
          alt={tags}
          onClick={() => onClick(id)}
        />
      </li>
    );
  });
};

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape),
  onClick: PropTypes.func,
};
