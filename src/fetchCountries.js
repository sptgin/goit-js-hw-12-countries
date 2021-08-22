const API_KEY = '';
const BASE_URL = 'https://restcountries.eu/rest/v2/name/';

export default class ConutresAPI {
  constructor() {
    this.searchQuery = '';
  }

  fetchCountries() {
    const url = `${BASE_URL}${this.searchQuery}`;
    return fetch(url)
      .then(response => response.json())
      .then(countres => {
        return countres;
      });
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
