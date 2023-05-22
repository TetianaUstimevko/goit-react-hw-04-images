export const URL = 'https://pixabay.com/api/';
export const API_KEY = '34966777-a1579da70d4a26e0e4c8e2fcd';

export const fetchImg = (URL, API_KEY, query, page) => {
  return fetch(
    `${URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error('Failed to find any images'));
  });
};