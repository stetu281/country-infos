import { delegate } from "./tools.js";

const countryList = await getCountryInfos();
const cardContainer = document.querySelector('.information__container');
const filters = document.querySelector('.filter');

console.log(countryList)

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
        console.log(countryInfos)
    }))

} else {
    console.log('Server nicht erreichbar anzeigen')
}


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

function filter(val, opt) {
    return countryList.filter(country => country[opt] === val);  
}

function toggleActiveState(currBtn) {
    document.querySelectorAll('.filter__btn').forEach(btn => {
        btn.classList.remove('filter__btn--active');
    });
    currBtn.classList.add('filter__btn--active');
}