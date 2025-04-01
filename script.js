import buttonShine from './modules/button_shine_module.mjs';
import myLogo from './modules/logo_module.mjs';


const hello = document.querySelectorAll('.hello div');
const button = document.getElementById('search-button');
const input = document.getElementById('search-input');
const mainStats = document.querySelectorAll('.stats');
const typesElement = document.getElementById('types');


myLogo('display', '6.5rem');

const loading = () => {
    typesElement.innerHTML = 'loading...'
    mainStats.forEach((_, index) => {
        mainStats[index].textContent = 'loading...';
    });
}

const parseData = (pokemon) => {
    const { name, id, weight, height } = pokemon;
    const sprite = pokemon.sprites.front_default;
    for (let index = 0; index < 4; index++) {
        mainStats[index].textContent = `${[name, id, weight, height][index]}`;
    }

    pokemon.stats.forEach((stat, index) => {
        mainStats[index + 4].textContent = stat.base_stat;
    })
    
    typesElement.innerHTML = ''
    pokemon.types.forEach((types) => {
        const pokemonType = types.type.name;
        typesElement.innerHTML += `<span class="${pokemonType}-type">${pokemonType.toUpperCase()}</span>`
    })

    document.querySelector('.sprite-container').src = sprite;
}

const fetchData = async (pokemon) => {
    try {
        const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemon}`);
        const data = await response.json();
        parseData(data)
    } catch (error) {
        console.error(error);
        alert("Pokemon doesn't exist");
        //TODO: add fallback
    };
}

button.addEventListener('click', () => {
    loading();
    fetchData(input.value);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        loading();
        fetchData(input.value);
    }
})




//TODO: Add select for the gender of pokemon that can be toggled on/off