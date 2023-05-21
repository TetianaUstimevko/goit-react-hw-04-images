import React, { Component } from 'react';
import s from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import Modal from 'components/Modal/Modal';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

export default class ImageGallery extends Component {
  state = {
    showModal: false,
    bigPic: null,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  handleImageClick = (largeImageURL) => {
    
      this.setState({ bigPic: largeImageURL });
      this.toggleModal();
    
  }

  render() {
    const { showModal, bigPic } = this.state;
    return (
      <>
        <ul className={s.gallery} >
          {this.props.images.map((img) => {
            return (
              <ImageGalleryItem
                key={nanoid()}
                smallImgURL={img.webformatURL}
                largeImageURL={img.largeImageURL}
                id={img.id}
                handleImageClick = {this.handleImageClick}
              />
            );
          })}
        </ul>
        {showModal && bigPic && <Modal onClose={this.toggleModal} pic={bigPic} />}
      </>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ),
};
