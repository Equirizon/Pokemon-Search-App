import buttonShine from './modules/button_shine_module.mjs';
import myLogo from './modules/logo_module.mjs';


const button = document.getElementById('search-button');
const input = document.getElementById('search-input');
const mainStats = document.querySelectorAll('.stats');
const typesElement = document.getElementById('types');
const spriteElement = document.querySelector('.sprite');
const spriteContainer = document.querySelector('.sprite-container');

myLogo('display', '6.5rem');

const loading = () => {
    typesElement.innerHTML = 'Loading...';
    mainStats.forEach((_, index) => {
        mainStats[index].textContent = 'Loading...';
    });
    spriteElement.src = '/assets/pokeball.svg';
    spriteElement.classList.add('rotate');
};

const notFound = () => {
    typesElement.innerHTML = '';
    mainStats.forEach((_, index) => {
        mainStats[index].textContent = 'Pokémon not found!';
    });
    spriteElement.classList.remove('rotate');
    spriteElement.src = '/assets/pokeball-error.svg';
};
 
const parseData = (pokemon) => {
    const { name, id, weight, height } = pokemon;
    const sprite = pokemon.sprites.front_default;

    for (let index = 0; index < 4; index++) {
        mainStats[index].textContent = `${[name.toUpperCase(), '#' + id, weight, height][index]}`;
    }

    pokemon.stats.forEach((stat, index) => {
        mainStats[index + 4].textContent = stat.base_stat;
    });
    
    typesElement.innerHTML = '';
    pokemon.types.forEach((types) => {
        const pokemonType = types.type.name;
        typesElement.innerHTML += `<span class="${pokemonType}-type">${pokemonType.toUpperCase()}</span>`;
    });

    spriteElement.src = sprite;
    spriteElement.classList.remove('rotate');
};

const fetchData = async (pokemon) => {
    try {
        const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemon}`);
        let data;
        if (response.ok) {
            data = await response.json();
        } else {
            throw new Error(`Status: ${response.status}`);
        }
        parseData(data);
    } catch (error) {
        console.error('There is a problem resolving the API:', error);
        alert("Pokémon not found");
        notFound();
    };
};

button.addEventListener('click', (e) => {
    e.preventDefault();
    loading();
    fetchData(input.value.toLowerCase());
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        loading();
        fetchData(input.value.toLowerCase());
    }
});




//TODO: Add select for the gender of pokemon that can be toggled on/off