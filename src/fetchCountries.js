
const BASE_URL = 'https://restcountries.com/v3.1/name/'
const options = 'fields=name,capital,population,flags,languages'


export function fetchCountries(name) {
  return fetch(`${BASE_URL}${name}?${options}`)
    .then(response => { return response.json()})
    throw new Error('fatal')


}

