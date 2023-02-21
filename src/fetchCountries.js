
    
    const searchBtn = document.querySelector('#search-box');
    // const countryList = document.querySelector('.country-list');
    // const countryInfo = document.querySelector('.country-info');
    searchBtn.addEventListener('input', onInputSearch);
    function onInputSearch(e) {
      const inputValue = e.target.value.trim();
      fetch(
        `https://restcountries.com/v2/all?fields=name,capital,currencies`
      ).then(response => {
          if(response.ok){
              return response.json
          }
  
          throw new Error ("oops")
      }).then((data) => console.log(data));
    }

