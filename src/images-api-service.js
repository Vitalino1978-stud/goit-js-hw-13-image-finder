const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '20659518-d870fa33769225566579aec48'
export default class GetImageAPI {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  fetchImages() {
    const URL = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
    return fetch(URL)
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        this.page += 1;
        return data.hits;
      });
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
  resetPage() {
    this.page = 1;
  }
}