import { Notify } from 'notiflix';
import _ from 'lodash'
const DEBOUNCE_DELAY = 300;
const searchBtn = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
searchBtn.addEventListener('input', _.debounce(onInputSearch, DEBOUNCE_DELAY));

let inputValue = '';

function fetchCountries(name) {
  fetch(
    `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => response.json())
    .then(onSuccess);
}
function onInputSearch(e) {
  const inputValue = e.target.value.trim();
  clearCountry()
  fetchCountries(inputValue)
  .then(onSuccess)
  

}


function onSuccess(countries){
  if(countries.length === 1){
    markup(countries[0])
  }else if(countries.length <=10){
    markupCountry(countries)
  }
  else{
    Notify.info("введи більше букв")
  }
 
}

function markup(country) {
 Object.values(country.languages).forEach(language=>{
  
    const markupCountry =  `
    <li class="title"><h1>Country: ${country.name}</h1></li>
     <li class="title"><p>population: ${country.population}</p></li>
     <li class="title"><p>capital: ${country.capital}</p></li>
     <img src="${country.flags.svg}" width=40px alt="flag">
     <li class="title"><p>languages: ${language.name}</p></li>
     `
     countryList.innerHTML = markupCountry
  })
 


 

  }

  function markupCountry(countryArray){
   countryArray.map((e=>{
    const countriesOne = `
    <h1>Country: ${e.name}</h1>
    <img src="${e.flags.svg}" width=40px alt="flag">`
    
    countryInfo.innerHTML = countriesOne
   }))
  }
 
function clearCountry(){
  if(inputValue === ''){
    countryInfo.innerHTML = ''
    countryList.innerHTML = ''
  }
 return
}