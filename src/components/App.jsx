import React, { useEffect, useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';

import { URL, API_KEY, fetchImg } from './Servises/api';

const App = () => {
  const [pictures, setPictures] = useState([]);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    if (!query) return;

    setStatus('pending');
    fetchImg(URL, API_KEY, query, page)
      .then((pictures) => {
        if (!pictures.total) {
          toast.error('Did not find anything, mate');
          return;
        }
        const selectedProperties = pictures.hits.map(({ id, largeImageURL, webformatURL }) => ({
          id,
          largeImageURL,
          webformatURL,
        }));
        setPictures((prevPictures) => [...prevPictures, ...selectedProperties]);
        setStatus('resolved');
        setShowBtn(page < Math.ceil(pictures.totalHits / 12));
      })
      .catch((error) => {
        setError(error.message);
        setStatus('rejected');
      });
  }, [query, page]);

  const processSubmit = (query) => {
    setQuery(query);
    setPictures([]);
    setPage(1);
    setShowBtn(false);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <Searchbar onSubmit={processSubmit} />
      {pictures.length > 0 && <ImageGallery images={pictures} />}
      {showBtn && <Button onClick={handleLoadMore} />}
      {status === 'pending' && <Loader />}
      {error && <div>Error: {error}</div>}
      <ToastContainer autoClose={2000} />
    </>
  );
};

export default App;
