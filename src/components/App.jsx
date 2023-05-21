import React, { Component } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';

import { fetchImg } from './Servises/api';

export default class App extends Component {
  state = {
    URL: 'https://pixabay.com/api/',
    API_KEY: '34966777-a1579da70d4a26e0e4c8e2fcd',
    pictures: [],
    error: '',
    status: 'idle',
    page: 1,
    query: '',
    shovBtn: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.query !== prevState.query ||
      this.state.page !== prevState.page
    ) {
      this.setState({ status: 'pending' });
      fetchImg(
        this.state.URL,
        this.state.API_KEY,
        this.state.query,
        this.state.page
      )
        .then(pictures => {
          if (!pictures.total) {
            toast.error('Did find anything, mate');
            return;
          }
          const selectedProperties = pictures.hits.map(
            ({ id, largeImageURL, webformatURL }) => {
              return { id, largeImageURL, webformatURL };
            }
          );
          this.setState(prevState => {
            return {
              pictures: [...prevState.pictures, ...selectedProperties],
              status: 'resolved',
              shovBtn: this.state.page < Math.ceil(pictures.totalHits / 12),
            };
          });
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  processSubmit = query => {
    this.setState({ query, pictures: [], page: 1, shovBtn: true });
  };

  handleLoadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    const { pictures, status, shovBtn } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.processSubmit} />
        {pictures.length > 0 && <ImageGallery images={pictures} />}
        {shovBtn && <Button onClick={this.handleLoadMore} />}
        {status === 'pending' && <Loader />}
        <ToastContainer autoClose={2000} />
      </>
    );
  }
}
