import React from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { searchImg } from 'API/PixabayAPI';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { useState } from 'react';
import { useEffect } from 'react';

export const App = () => {
  const [images, setImages] = useState([]);
  const [filter, setFilter] = useState('');
  const [availablePages, setAvailablePages] = useState(0);
  const [page, setPage] = useState(1);
  const [modalImg, setModalImg] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getImages = async () => {
      setLoading(true);
      const { totalHits, hits } = await searchImg(filter, page);
      const availablePages = Math.ceil(totalHits / 12);
      setAvailablePages(availablePages);
      setImages(images => [...images, ...hits]);
      setLoading(false);
    };
    getImages(filter, page);
  }, [filter, page]);

  const submitHandler = searchValue => {
    const trimmedSearchValue = searchValue?.trim() || '';
    const search = filter !== trimmedSearchValue;
    if (search) {
      newSearchHandler(trimmedSearchValue);
    }
  };

  const newSearchHandler = trimmedSearchValue => {
    setImages([]);
    setFilter(trimmedSearchValue);
    setAvailablePages(0);
    setPage(1);
    setModalImg(null);
  };

  const openModal = id => {
    const currentImg = images.find(img => img.id === id);
    setModalImg(currentImg);
  };

  return (
    <div>
      <Searchbar onSubmit={value => submitHandler(value)} />
      <ImageGallery>
        <ImageGalleryItem images={images} onClick={id => openModal(id)} />
      </ImageGallery>

      {modalImg && (
        <Modal modalImg={modalImg} onCloseModal={() => setModalImg(null)} />
      )}
      {loading && <Loader />}
      {availablePages > page && loading === false && (
        <Button onClick={() => setPage(page + 1)} />
      )}
    </div>
  );
};
