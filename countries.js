const countriesList = document.getElementById("countries-body");
let countries;
const countrySearch = document.getElementById("country-search");

async function fetchMoviesJSON() {
  const response = await fetch("https://restcountries.com/v3.1/all");
  data = await response.json();
  return data;
}

fetchMoviesJSON().then((data) => initialize(data));

function changeToOne() {
  window.history.pushState("object or string", "Title", "/index.html");
  location.reload();
}

function initialize(Data) {
  countries = Data;
  let options = "";
  countries.sort((a, b) => a.name.official.localeCompare(b.name.official));
  countries.forEach(
    (country) =>
      (options += `<div class="card" id="flag-container">
  <img src="${country.flags.png}" alt="">
  <div class="info">
      <h4><p>${country.name.official}</p></h4>
      <p>Capital: ${country.capital}</span></p>
      <p>Region: ${country.region}</p>
      <p>Subregion:${country.subregion}</span></p>
      <p>Area: ${country.area} km <sup>2</sup></p>
  </div>
</div>`)
  );
  countriesList.innerHTML = options;
}

searchBar.addEventListener("input", () => {
  if (searchBar.innerHTML == "") {
    initialize(data);
  }
  const name = searchBar.value;
  const url = `https://restcountries.com/v3.1/name/${name}?fullText=true`;
  getCountryBySearch(url);
});

const getCountryBySearch = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  showCountry(data[0]);
  console.log(data[0]);
};

function showCountry(data) {
  countries = data;
  let options = "";
  options = `<div class="card" id="flag-container">
  <img src="${countries.flags.png}" alt="">
  <div class="info">
      <h4><p>${countries.name.official}</p></h4>
      <p>Capital: ${countries.capital}</span></p>
      <p>Region: ${countries.region}</p>
      <p>Subregion:${countries.subregion}</span></p>
      <p>Area: ${countries.area} km <sup>2</sup></p>
  </div>
</div>`;
  countriesList.innerHTML = options;
}
