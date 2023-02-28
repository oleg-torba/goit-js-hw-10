import { Notify } from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const searchBtn = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
searchBtn.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

let inputValue = '';

function onInputSearch(e) {
  const inputValue = e.target.value.trim();

    clearInput();
    
  
  fetchCountries(inputValue)
  .then(onSuccess)
  .catch(fail);
}

function onSuccess(country) {
  if (country.length === 1) {
    countryInfo.insertAdjacentHTML('beforeend', markupCountryInfo(country));
    countryList.insertAdjacentHTML('beforeend', markupCountryList(country));
  } else if (country.length <= 10) {
    countryList.insertAdjacentHTML('beforeend', markupCountryList(country));
  } 
  else if(country.length >10) {
    tooMuch();
  }
}

function markupCountryInfo(country) {
  const markupCountry = country.map(({ population, capital, languages }) => {
    return `
   
    <li class="list"><p>Population: <span class="title">${population}</span></p></li>
    <li class="list"><p>Capital: <span class="title">${capital}</span></p></li>
    <li class="list"><p>Language: <span class="title">${Object.values(languages)}</span></p></li>
    `;
  });
  return markupCountry;
}

function markupCountryList(country) {
  const markup = country.map(({ name, flags }) => {
    return `
    <li class="list">
    <img src="${flags.svg}" width=40px heigth="20px alt="flag">
    <h2 class="title">${name.official}
    </h2>
    
    </li>
    `;
  }).join('');
  return markup;
}

function clearInput() {

    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
  
}

function tooMuch() {
  Notify.info('Too many matches found. Please enter a more specific name.');
}

function fail(error){
  clearInput()
  Notify.failure(error.message)
}