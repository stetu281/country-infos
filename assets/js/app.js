import { delegate } from "./tools.js";

const countryList = await getCountryInfos();
const cardContainer = document.querySelector('.information__container');
const filters = document.querySelector('.filter');


if(countryList !== undefined) {
    render(countryList)
    filters.addEventListener('click', (e) => {
        toggleActiveState(e.target);
        const region = e.target.innerHTML;
        const filtered = filter(region);
        render(filtered);
    })
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
                <button class="card__button">Show Infos</button>
            </div>
        `;

        cardContainer.appendChild(card);
    }    
}

function filter(region) {
    return countryList.filter(country => country.region === region);  
}

function toggleActiveState(currBtn) {
    document.querySelectorAll('.filter__btn').forEach(btn => {
        btn.classList.remove('filter__btn--active');
    });
    currBtn.classList.add('filter__btn--active');
}