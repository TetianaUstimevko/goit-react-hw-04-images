// export const fetchImg = (URL, API_KEY, query, page) => {
//   return fetch(
//     `${URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
//   ).then((res) => {
//     if (res.ok) {
//       return res.json();
//     }
//     return Promise.reject(new Error('Failed to find any images'));
//   });
// };