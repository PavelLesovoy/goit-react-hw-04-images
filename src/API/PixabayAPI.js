import axios from 'axios';

const KEY = '30296942-4de4307a99055e9d668a05bee';

export const searchImg = (searchQuery, page) => {
  return axios(
    `https://pixabay.com/api/?q=${searchQuery}&page=1&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12&page=${page}`
  )
    .then(obj => obj.data)
    .catch(error => console.log(error));
};
