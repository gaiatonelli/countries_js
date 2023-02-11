let countries;
const countriesList = document.getElementById("list");

async function fetchMoviesJSON() {
  const response = await fetch("https://restcountries.com/v3.1/all");
  data = await response.json();
  return data;
}

fetchMoviesJSON().then((data) => initialize(data));

countriesList.addEventListener("change", selectedCountry);

function selectedCountry(event) {
  countryDetail(event.target.value);
}

function initialize(Data) {
  countries = Data;
  let options = "";
  countries.sort((a, b) => a.name.official.localeCompare(b.name.official));
  countries.forEach(
    (country) =>
      (options += `<option value="${country.name.official}">${country.name.official}</option>`)
  );
  countriesList.innerHTML = options;

  countriesList.selectedIndex = Math.floor(
    Math.random() * countriesList.length
  );
  countryDetail(countriesList[countriesList.selectedIndex].value);
}

function countryDetail(countryByName) {
  const countryData = countries.find(
    (country) => country.name.official === countryByName
  );

  document.querySelector("#flag-container img").src = countryData.flags.png;
  document.querySelector(
    "#flag-container img"
  ).alt = ` ${countryData.name.official}`;
  console.log(countryData.flags.png);
  document.getElementById("name").innerHTML = countryData.name.official;
  document.getElementById("capital").innerHTML = countryData.capital;
  document.getElementById("region").innerHTML = countryData.region;
  document.getElementById("subregion").innerHTML = countryData.subregion;
  document.getElementById("area").innerHTML = countryData.area;
}

function changeToAll() {
  window.history.pushState("object or string", "Title", "/all-countries.html");
  location.reload();
}
