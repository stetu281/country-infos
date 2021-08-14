export const render = (countrys) => {

    const cardContainer = document.querySelector('.information__container');

    cardContainer.innerHTML = '';

    for(const [index, country] of Object.entries(countrys)) {

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
    }; 
};

export const renderOverlay = (countryListAll, country) => {

    console.log(country)

    document.querySelector('.overlay__img').src = country.flag;
    document.querySelector('.overlay__title').innerHTML = country.name;
    document.querySelector('.overlay__list').innerHTML = `
    <li class="overlay__list-item"><span class="overlay__list-item--bold">Capital:</span> ${country.capital}</li>
    <li class="overlay__list-item"><span class="overlay__list-item--bold">Region:</span> ${country.region}</li>
    <li class="overlay__list-item"><span class="overlay__list-item--bold">Subregion:</span> ${country.subregion}</li>
    <li class="overlay__list-item"><span class="overlay__list-item--bold">Population:</span> ${country.population}</li>
    <li class="overlay__list-item"><span class="overlay__list-item--bold">Area:</span> ${country.area}</li>
    <li class="overlay__list-item"><span class="overlay__list-item--bold">Top Level Domain:</span> ${country.topLevelDomain}</li>
    <li class="overlay__list-item"><span class="overlay__list-item--bold">Currencies:</span> ${country.currencies[0].name}</li>
    <li class="overlay__list-item"><span class="overlay__list-item--bold">Languages:</span> ${getLanguages(country.languages)}</li>
    `
    const borderCountrys = document.querySelector('.borders__countrys');
    borderCountrys.innerHTML = '';

    if(country.borders.length !== 0) {
        console.log(country.borders)
        for(let border of country.borders) {
            let button = document.createElement('button');
            button.classList = 'borders__btn';
            button.dataset.country = border;
            let name = filter(countryListAll, border, 'alpha3Code');
            button.innerHTML = name[0].name;
            borderCountrys.appendChild(button)
        }
    } else {
        borderCountrys.innerHTML = `<p class="borders__noborders">${country.name} borders no other Country</p>`;
    }
}

export const filter = (arr, val, opt) => {
    return arr.filter(country => country[opt] === val);  
}

export const toggleActiveState = (currBtn) => {
    document.querySelectorAll('.filter__btn').forEach(btn => {
        btn.classList.remove('filter__btn--active');
    });
    currBtn.classList.add('filter__btn--active');
}

const getLanguages = (languages) => {
    let arr = [];
    for(let language of languages) {
        arr.push(language.name);
    }
    return arr.join(', ');
}