import { delegate } from "./tools.js";

const countryList = await getCountryInfos();
const cardContainer = document.querySelector('.information__container');
const filters = document.querySelector('.filter');
const overlay = document.querySelector('.overlay');

if(countryList !== undefined) {
    render(countryList);

    filters.addEventListener('click', delegate('.filter__btn', (e) => {
        toggleActiveState(e.target);
        if(e.target.innerHTML === 'All') {
            render(countryList);
        } else {
            const region = e.target.innerHTML;
            const filtered = filter(region, 'region');
            render(filtered);
        }
    }))

    cardContainer.addEventListener('click', delegate('.card__button', (e) => {
        const countryInfos = filter(e.target.dataset.country, 'alpha3Code');
        renderOverlay(countryInfos[0]);
        overlay.classList.toggle('overlay--show');

    }))

} else {
    console.log('Server nicht erreichbar anzeigen')
}


document.querySelector('.overlay__btn').addEventListener('click', () => {
    overlay.classList.toggle('overlay--show');
});


async function getCountryInfos() {
    try {
        const response = await fetch('https://restcountries.eu/rest/v2/all');
        return await response.json();
    } catch (error) {
        console.error('Error: ', error);
    }
}

function render(countrys) {

    cardContainer.innerHTML = '';

    for(let country of countrys) {


        const card = document.createElement('div');
        card.classList = 'card';

        card.innerHTML = `
            <img src="${country.flag}" class="card__img" alt="Country Flag">
            <div class="card__description">
                <h2 class="card__title">${country.name}</h2>
                <ul class="card__list">
                    <li class="card__listitem">
                        <span class="card__listitem--bold">
                            Region:
                        </span> 
                        ${country.region}
                    </li>
                    <li class="card__listitem">
                        <span class="card__listitem--bold">
                            Capital:
                        </span> 
                        ${country.capital}
                    </li>
                </ul>
                <button class="card__button" data-country=${country.alpha3Code}>Show Infos</button>
            </div>
        `;

        cardContainer.appendChild(card);
    }    
}

function renderOverlay(country) {

    document.querySelector('.overlay__img').src = country.flag;
    document.querySelector('.overlay__title').innerHTML = country.name;
    document.querySelector('.overlay__list').innerHTML = `
    <li class="overlay__list-item"><span class="overlay__list-item--bold">Capital:</span>${country.capital}</li>
    <li class="overlay__list-item"><span class="overlay__list-item--bold">Region:</span>${country.region}</li>
    <li class="overlay__list-item"><span class="overlay__list-item--bold">Subregion:</span>${country.subregion}</li>
    <li class="overlay__list-item"><span class="overlay__list-item--bold">Population:</span>${country.population}</li>
    <li class="overlay__list-item"><span class="overlay__list-item--bold">Area:</span>${country.area}</li>
    <li class="overlay__list-item"><span class="overlay__list-item--bold">Top Level Domain:</span>${country.topLevelDomain}</li>
    <li class="overlay__list-item"><span class="overlay__list-item--bold">Timezones:</span>${country.timezones}</li>
    <li class="overlay__list-item"><span class="overlay__list-item--bold">Currencies:</span>${country.currencies[0].name}</li>
    <li class="overlay__list-item"><span class="overlay__list-item--bold">Languages:</span>${country.languages}</li>
    `
    const borderCountrys = document.querySelector('.borders__countrys');
    borderCountrys.innerHTML = '';

    if(country.borders.length !== 0) {
        for(let border of country.borders) {
            let button = document.createElement('button');
            button.classList = 'borders__btn';
            button.dataset.country = border;
            let name = filter(border, 'alpha3Code');
            button.innerHTML = name[0].name;
            borderCountrys.appendChild(button)
        }
        borderCountrys.addEventListener('click', delegate('.borders__btn', (e) => {
            let clickedCountry = filter(e.target.dataset.country, 'alpha3Code');
            renderOverlay(clickedCountry[0]);
        }))
    } else {
        borderCountrys.innerHTML = `<p class="borders__noborders">${country.name} borders no other Country</p>`;
    }
}

function filter(val, opt) {
    return countryList.filter(country => country[opt] === val);  
}

function toggleActiveState(currBtn) {
    document.querySelectorAll('.filter__btn').forEach(btn => {
        btn.classList.remove('filter__btn--active');
    });
    currBtn.classList.add('filter__btn--active');
}