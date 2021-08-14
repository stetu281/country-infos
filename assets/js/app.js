import * as funcs from "./functions.js";
import { delegate, get } from "./tools.js";

let countryListAll = [];
let countryList = [];
const overlay = document.querySelector('.overlay');

//Toggle Darkmode
document.querySelector('.header__darkmode').addEventListener('click', (e) => {
    e.target.classList.toggle('header__darkmode--light');
    document.body.classList.toggle('darkmode');
    if(e.target.classList.contains('header__darkmode--light')) {
        e.target.innerText = "Light mode";
    } else {
        e.target.innerText = "Dark mode";
    }
});

//load full countrylist at start
get('https://restcountries.eu/rest/v2/all', function(response) {
    countryListAll = response;
    funcs.render(countryListAll);
})

//Search
document.querySelector('.search__btn').addEventListener('click', () => {
    const input = document.querySelector('.search__input');
    const inputErr = document.querySelector('.search__input-empty');
    let url;
    input.style.borderColor = '#171123';
    inputErr.innerText = '';

    if(input.value !== '') {
        const radioButtons = document.querySelectorAll('.search__option input[name="search-type"]');
        let radioValue;

        for(let button of radioButtons) {
            if(button.checked === true) {
                radioValue = button.value;
            };
        };

        if(radioValue === 'country') {
            url = `https://restcountries.eu/rest/v2/name/${input.value}`;

        } else if (radioValue === 'language') {
            url = `https://restcountries.eu/rest/v2/lang/${input.value}`;
        } else {
            url = `https://restcountries.eu/rest/v2/capital/${input.value}`;
        }
        input.value = '';
    } else {
        input.style.borderColor = '#ff2e2e';
        inputErr.innerText = 'Please fill in';
    }
    get(url, function(response) {
        countryList = response;
        funcs.render(countryList);
    })
});

//show All countrys Button
document.querySelector('.search__btn-full').addEventListener('click', () => {
    funcs.render(countryListAll);
});

//filter results
document.querySelector('.filter').addEventListener('click', delegate('.filter__btn', (e) => {
    funcs.toggleActiveState(e.target);
    if(e.target.innerHTML === 'All') {
        funcs.render(countryList);
    } else {
        const region = e.target.innerHTML;
        console.log(countryList)
        const filtered = funcs.filter(countryList, region, 'region');
        funcs.render(filtered);
    }
}))

//Show details in overlay
document.querySelector('.information__container').addEventListener('click', delegate('.card__button', (e) => {
    const countryInfos = funcs.filter(countryListAll, e.target.dataset.country, 'alpha3Code');
    funcs.renderOverlay(countryListAll, countryInfos[0]);
    overlay.classList.toggle('overlay--show');

    document.querySelector('.borders__countrys').addEventListener('click', delegate('.borders__btn', (e) => {
        let clickedCountry = funcs.filter(countryListAll, e.target.dataset.country, 'alpha3Code');
        funcs.renderOverlay(countryListAll, clickedCountry[0]);
    }))

}))

//Close overlay
document.querySelector('.overlay__btn').addEventListener('click', () => {
    overlay.classList.toggle('overlay--show');
});