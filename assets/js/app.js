const countryList = await getCountryInfos();
const cardContainer = document.querySelector('.information__container');

render(countryList)

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

        console.log(country)

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