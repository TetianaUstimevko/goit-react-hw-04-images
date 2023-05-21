import React from 'react';
import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({handleImageClick, largeImageURL, smallImgURL, id}) => {

    return (
      <li className={s.galleryItem}>
        <img onClick={()=> handleImageClick(largeImageURL)} src={smallImgURL} alt={id} />
      </li>
    );
  }

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  smallImgURL: PropTypes.string.isRequired,
  handleImageClick: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  };
