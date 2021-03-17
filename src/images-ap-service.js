// import { get, set } from "core-js/core/dict";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '20659518-d870fa33769225566579aec48';
export default class ImageSearch {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }


  fetchImages() {
    const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
    return fetch(url)
      
      .then(response => response.json())
      .then(({ hits }) => {
       this.incrementPage()
        return hits;
      });
       
  }
  
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

///