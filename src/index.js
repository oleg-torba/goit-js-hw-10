import { Notify } from 'notiflix';
import _ from 'lodash';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const searchBtn = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
searchBtn.addEventListener('input', _.debounce(onInputSearch, DEBOUNCE_DELAY));

let inputValue = '';

function onInputSearch(e) {
  const inputValue = e.target.value.trim();
  clearInput();
  fetchCountries(inputValue).then(onSuccess);
}

function onSuccess(country) {
  if (country.length === 1) {
    countryInfo.insertAdjacentHTML('beforeend', markupCountryInfo(country));
    countryList.insertAdjacentHTML('beforeend', markupCountryList(country));
  } else if (country.length <= 10) {
    countryList.insertAdjacentHTML('beforeend', markupCountryList(country));
  } else {
    error();
  }
}

function markupCountryInfo(country) {
  const markupCountry = country.map(({ population, capital, languages }) => {
    return `
   
    <li class="title"><p>Population: ${population}</p></li>
    <li class="title"><p>Capital: ${capital}</p></li>
    <li class="title"><p>Language: ${Object.values(languages)}</p></li>
    `;
  });
  return markupCountry;
}

function markupCountryList(country) {
  const markup = country.map(({ name, flags }) => {
    return `
    <li class="list">
    <img src="${flags.svg}" width=40px heigth="20px alt="flag">
    <h1 class="title">${name.official}
    </h1>
    
    </li>

    `;
  }).join('');
  return markup;
}

function clearInput() {
  if (inputValue === '') {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
  }
  return;
}

function error() {
  Notify.info('too much');
}
