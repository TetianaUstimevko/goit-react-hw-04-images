import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ handleImageClick, largeImageURL, smallImgURL, id }) => {
  const handleClick = () => {
    handleImageClick(largeImageURL);
  };

  return (
    <li className={s.galleryItem}>
      <img onClick={handleClick} src={smallImgURL} alt={id} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  smallImgURL: PropTypes.string.isRequired,
  handleImageClick: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;