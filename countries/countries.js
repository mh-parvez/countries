import changeTheme from "../utils/theme.js";
import fetchData from "../utils/fetchdata.js";

// --------------- Theme Setting --------------

const toggleTheme = document.querySelector(".theme-changer");
changeTheme(toggleTheme);

// --------------- Country Setting --------------

const flagImage = document.querySelector(".flag");
const counteryName = document.querySelector(".country-name");
const nativeName = document.querySelector(".native-name");
const population = document.querySelector(".population");
const region = document.querySelector(".region");
const subRegion = document.querySelector(".sub-region");
const capital = document.querySelector(".capital");
const topLevelDomain = document.querySelector(".top-level-domain");
const currencies = document.querySelector(".currencies");
const languages = document.querySelector(".languages");
const borderCountries = document.querySelector(".border-countries");

const countery = new URLSearchParams(location.search).get("name");

fetchData(`https://restcountries.com/v3.1/name/${countery.toLocaleLowerCase()}?fullText=true`)
  .then((data) => {
    const countery = data[0];

    flagImage.src = countery.flags.svg;
    counteryName.textContent = countery.name.common;
    region.textContent = countery.region;
    topLevelDomain.textContent = countery.tld.join(", ");
    population.textContent = countery.population.toLocaleString("en-IN");

    if (countery.capital) capital.textContent = countery.capital?.[0];
    if (countery.subregion) subRegion.textContent = countery.subregion;
    if (countery.languages) languages.textContent = Object.values(countery.languages).join(", ");

    if (countery.name.nativeName) {
       nativeName.textContent = Object.values(countery.name.nativeName)[0].common
    } else {
       nativeName.textContent = countery.name.common;
    }
    
    if(countery.currencies) {
       currencies.textContent = Object.values(countery.currencies).map(currency => currency.name).join(", ")
    }

    if (countery.borders) {
      countery.borders.forEach(border => {
        fetchData(`https://restcountries.com/v3.1/alpha/${border}`)
          .then(([borderCountery]) => {
            // console.log(borderCountery);
            const borderCounteryTag = document.createElement("a");
            borderCounteryTag.textContent = borderCountery.name.common;
            borderCounteryTag.href = `countries.html?name=${borderCountery.name.common}`;
            borderCountries.append(borderCounteryTag);
          })
      });
    }
  })
  .catch((error) => {
    console.log(error);
  });
