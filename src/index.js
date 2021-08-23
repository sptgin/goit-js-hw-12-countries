import './styles.css';
import {
  alert,
  defaultModules,
} from '../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
import debounce from 'lodash.debounce';
import countryListTemplate from './templates/countrylist.hbs';
import countryCardTemplate from './templates/countrycard.hbs';
import CountresAPI from './fetchCountries';

const countrySearchInput = document.querySelector('#country_search_input');
const countrySearchList = document.querySelector('.country__list');
const countrySearchCard = document.querySelector('.country__card');
const сountrySearchAPI = new CountresAPI();

countrySearchInput.addEventListener('input', debounce(countrySearch, 1000));

function countrySearch(event) {
  event.preventDefault();
  countrySearchListClear();
  countrySearchCardClear();
  сountrySearchAPI.query = countrySearchInput.value;
  сountrySearchAPI
    .fetchCountries()
    .then(countres => {
      if (countres.length === 1) {
        countrySearchCardMake(countres);
      } else {
        if (countres.length > 1 && countres.length < 11) {
          countrySearchListMake(countres);
        } else {
          if (countres.length > 10) {
            alert({
              text: 'Too many matces found !',
              delay: 500,
            });
          } else {
            alert({
              text: 'No matces found !',
              delay: 500,
            });
          }
        }
      }
      countrySearchInput.value = '';
    })
    .catch(() => {
      alert({
        text: 'No data for search ...',
        delay: 500,
      });
    });
}

function countrySearchListMake(countres) {
  countrySearchList.insertAdjacentHTML(
    'beforeend',
    countres.map(countryListTemplate).join(' '),
  );
}
function countrySearchListClear() {
  countrySearchList.innerHTML = '';
}
function countrySearchCardMake(countres) {
  countrySearchCard.insertAdjacentHTML(
    'beforeend',
    countres.map(countryCardTemplate).join(' '),
  );
}
function countrySearchCardClear() {
  countrySearchCard.innerHTML = '';
}
