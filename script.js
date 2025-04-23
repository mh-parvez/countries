import fetchData from "./utils/fetchdata.js";
import changeTheme from "./utils/theme.js";

// --------------- Theme Setting --------------

const toggleTheme = document.querySelector(".theme-changer");
changeTheme(toggleTheme);

// --------------- Counties Setting --------------

const countriesContainer = document.querySelector(".countries-container");
const filterByRegion = document.querySelector(".filter-by-region");
const searchBar = document.querySelector(".search-bar");
const url = "https://restcountries.com/v3.1/all";

let allCountries = [];

fetchData(url).then((data) => {
  if (data) {
    allCountries = [...data];
    renderCounteries(allCountries);
  } else {
    console.log("No data returned.");
  }
});

function createCard(countery) {
  return `
  <a href="../countries/countries.html?name=${countery.name.common}">
      <img class="countery-flag" src="${countery.flags.svg}" alt="${
    countery.name.common
  }-flag">
      <div class="countery-details">
          <h3 class="countery-name">${countery.name.common}</h3>
          <p><b>Population: </b>${countery.population.toLocaleString(
            "en-IN"
          )}</p>
          <p><b>Region: </b>${countery.region}</p>
          <p><b>Capital: </b>${countery.capital}</p>
      </div>
  </a>`;
}

function renderCounteries(countries) {
  countriesContainer.innerHTML = "";
  countries.forEach((countery) => {
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");
    cardContainer.innerHTML = createCard(countery);
    countriesContainer.append(cardContainer);
  });
}

filterByRegion.addEventListener("change", () => {
  const regionContries = allCountries.filter((countery) => {
    return countery.region === filterByRegion.value;
  });

  if (!filterByRegion.value) {
    renderCounteries(allCountries);
  } else {
    renderCounteries(regionContries);
  }
});

searchBar.addEventListener("input", () => {
  if (searchBar.value) {
    const searchContries = allCountries.filter((countery) => {
      const value = searchBar.value.toLowerCase().trim();
      const counteryName = countery.name.common.toLowerCase();
      return counteryName.includes(value);
    });
    renderCounteries(searchContries);
  }
});
