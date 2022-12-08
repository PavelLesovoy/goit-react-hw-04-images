import React from 'react';
import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { searchImg } from 'API/PixabayAPI';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export class App extends Component {
  constructor() {
    super();
    this.closeModal = this.closeModal.bind(this);
    this.onClickNext = this.onClickNext.bind(this);
  }

  state = {
    images: [],
    filter: '',
    availablePages: 0,
    page: 1,
    modalImg: null,
    loading: false,
  };

  async componentDidUpdate(_, prevState) {
    const { filter, page } = this.state;

    if (filter !== prevState.filter) {
      this.togleSpiner();
      const response = await searchImg(filter, page);
      const availablePages = Math.ceil(response.totalHits / 12);

      this.setState({
        images: [...response.hits],
        availablePages: availablePages,
      });
      this.togleSpiner();
      return;
    }

    if (page !== prevState.page) {
      this.togleSpiner();
      const response = await searchImg(filter, page);
      this.setState({
        images: [...prevState.images, ...response.hits],
      });
      this.togleSpiner();
    }
  }

  togleSpiner() {
    this.setState(prevState => {
      return { loading: !prevState.loading };
    });
  }

  submitHandler(searchValue) {
    const trimmedSearchValue = searchValue?.trim() || '';
    const search = this.state.filter !== trimmedSearchValue;
    if (search) {
      this.setState({
        images: [],
        filter: trimmedSearchValue,
        availablePages: 0,
        page: 1,
        modalImg: null,
      });
    }
  }

  openModal(id) {
    const currentImg = this.state.images.find(img => img.id === id);
    this.setState({ modalImg: currentImg });
  }

  closeModal() {
    this.setState({ modalImg: null });
  }

  onClickNext() {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  }

  render() {
    const { images, modalImg, loading, availablePages, page } = this.state;
    return (
      <div>
        <Searchbar onSubmit={value => this.submitHandler(value)} />
        <ImageGallery>
          <ImageGalleryItem
            images={images}
            onClick={id => this.openModal(id)}
          />
        </ImageGallery>

        {modalImg && (
          <Modal modalImg={modalImg} onCloseModal={this.closeModal} />
        )}
        {loading && <Loader />}
        {availablePages > page && loading === false && (
          <Button onClick={this.onClickNext} />
        )}
      </div>
    );
  }
}
