import React, { useState } from 'react';
import s from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Modal from 'components/Modal/Modal';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

const ImageGallery = ({ images }) => {
const [showModal, setShowModal] = useState(false);
const [bigPic, setBigPic] = useState(null);

const toggleModal = () => {
setShowModal(!showModal);
};

const handleImageClick = (largeImageURL) => {
setBigPic(largeImageURL);
toggleModal();
};

return (
<>
<ul className={s.gallery}>
{images.map((img) => (
<ImageGalleryItem
         key={nanoid()}
         smallImgURL={img.webformatURL}
         largeImageURL={img.largeImageURL}
         id={img.id}
         handleImageClick={handleImageClick}
       />
))}
</ul>
{showModal && bigPic && <Modal onClose={toggleModal} pic={bigPic} />}
</>
);
};

ImageGallery.propTypes = {
images: PropTypes.arrayOf(
PropTypes.shape({
id: PropTypes.number.isRequired,
largeImageURL: PropTypes.string.isRequired,
webformatURL: PropTypes.string.isRequired,
})
),
};

export default ImageGallery;