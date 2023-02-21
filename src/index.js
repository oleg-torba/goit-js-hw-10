import './css/styles.css';
// import fetchCountries from './fetchCountries.js';
import { Notify } from 'notiflix';
const DEBOUNCE_DELAY = 300;
// // // const name = countries.name;
// // // const capital = countries.capital;
// // // const flags = countries.flags

// // // function countryMark(fields) {
// // //   countryList.innerHTML =
// // // }

// // // function onSuccess(countries){
// // //   markup()
// // // }

// // fetchCountries()

const searchBtn = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
// // const countryInfo = document.querySelector('.country-info');
searchBtn.addEventListener('input', onInputSearch);

// function onInputSearch(e) {
//   const inputValue = e.target.value.trim();
// fetchCountries()
// //   markupArray(inputValue)
// }

// // function markupArray(country) {
// //   const countries = country.forEach(array => {
// //    console.log(Object.values(array.name))

// //   });
// // }
// // function markup(country){
// //
// // }

function fetchCountries(name) {
  fetch(`https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`)
    .then(response => response.json())
    .then(onSuccess)
    
}

function onSuccess(country){
   
       const countries = Object.values(country).forEach(value=> markup(value.name))
       
 

}

function onInputSearch(e) {
  const inputValue = e.target.value;
  fetchCountries(inputValue);
}
function markup (name){
    // const markupList = `
    
    countryList.innerHTML = `
    <h1>country: ${name}</h1>`;
    
}