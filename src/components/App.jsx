import React, { useEffect, useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';

import { fetchImg } from './Servises/api';

const App = () => {
  const URL = 'https://pixabay.com/api/';
  const API_KEY = '34966777-a1579da70d4a26e0e4c8e2fcd';

  const [pictures, setPictures] = useState([]);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    if (query !== '' || page !== 1) {
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
    }
  }, [URL, API_KEY, query, page]);

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

// const App = () => {
//   const [URL, setURL] = useState('https://pixabay.com/api/');
//   const [API_KEY, setAPI_KEY] = useState('34966777-a1579da70d4a26e0e4c8e2fcd');
//   const [pictures, setPictures] = useState([]);
//   const [error, setError] = useState('');
//   const [status, setStatus] = useState('idle');
//   const [page, setPage] = useState(1);
//   const [query, setQuery] = useState('');
//   const [showBtn, setShowBtn] = useState(false);

//   useEffect(() => {
//     if (query !== '' || page !== 1) {
//       setStatus('pending');
//       fetchImg(URL, API_KEY, query, page)
//         .then(pictures => {
//           if (!pictures.total) {
//             toast.error('Did not find anything, mate');
//             return;
//           }
//           const selectedProperties = pictures.hits.map(({ id, largeImageURL, webformatURL }) => ({
//             id,
//             largeImageURL,
//             webformatURL,
//           }));
//           setPictures(prevPictures => [...prevPictures, ...selectedProperties]);
//           setStatus('resolved');
//           setShowBtn(page < Math.ceil(pictures.totalHits / 12));
//         })
//         .catch(error => {
//           setError(error);
//           setStatus('rejected');
//         });
//     }
//   }, [URL, API_KEY, query, page]);

//   const processSubmit = query => {
//     setQuery(query);
//     setPictures([]);
//     setPage(1);
//     setShowBtn(true);
//   };

//   const handleLoadMore = () => {
//     setPage(prevPage => prevPage + 1);
//   };

//   return (
//     <>
//       <Searchbar onSubmit={processSubmit} />
//       {pictures.length > 0 && <ImageGallery images={pictures} />}
//       {showBtn && <Button onClick={handleLoadMore} />}
//       {status === 'pending' && <Loader />}
//       <ToastContainer autoClose={2000} />
//     </>
//   );
// };

// export default App;