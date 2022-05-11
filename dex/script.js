const poke_container = document.getElementById('poke_container');
let pokemons = [];
const pokemons_number = 151;
const search = document.getElementById("search");
const form = document.getElementById("form")

const fetchPokemons = async () => {
    for (let i = 1; i <= pokemons_number; i++){
        await getAllPokemon(i);
    }
    pokemons.forEach((pokemon) => createPokemonCard(pokemon));

};

const removePokemon = () =>{
    const pokemonEls = document.getElementsByClassName("pokemon");
    let removablePokemons = [];
    for (let i = 0; i < pokemonEls.length; i++){
        const pokemonEl = pokemonEls[i];
        removablePokemons = [...removablePokemons, pokemonEl];
    }
    removablePokemons.forEach((remPoke) => remPoke.remove());

}

const getPokemon = async id => {
    const searchPokemons = pokemons.filter((poke) => poke.name === id);
    removePokemon();
    searchPokemons.forEach((pokemon) => createPokemonCard(pokemon));

}

const getAllPokemon = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokemon = await res.json();
    pokemons = [...pokemons,pokemon];

};

const getPokeTypes = async type => {
    const searchPokeTypes = pokemons.filter((poke) => poke.types[0].type.name === type);
    removePokemon();
    searchPokeTypes.forEach((pokemon) => createPokemonCard(pokemon));
}

fetchPokemons();


const colors = {
  bug: '#007524',
  dark: '#3D3D39',
  dragon: '#269191',
  electric: '#fae485',
  fairy: '#BF2A74',
  fighting: '#8C510D',
  fire: '#FF0000',
  flying: '#256E99',
  ghost: '#490E61',
  grass: '#39BD20',
  ground: '#995D4B',
  ice: '#40E0D0',
  normal: '#CCCCCC',
  poison: '#931DC4',
  psychic: '#A8278E',
  rock: '#472B23',
  steel: '#6B6B6B',
  water: '#008FFF',
};

const main_types = Object.keys(colors);

function createPokemonCard(pokemon){
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');
    const poke_types = pokemon.types.map((el) => el.type.name).slice(0, 1);
	const type = main_types.find((el) => poke_types.indexOf(el) > -1);
	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const poke_stat = pokemon.stats.map((el) => el.stat.name);
    const stats = poke_stat.slice(0, 3);
    const base_value = pokemon.stats.map((el) => el.base_stat);
    const base_stat = base_value.slice(0, 3);
    const stat = stats.map((stat) => {
        return `<li class="names">${stat}</li>`;

    }).join("");
    const base = base_stat.map((base) => {
        return `<li class="base">${base}</li>`
    }).join("");
	const color = colors[type];

	pokemonEl.style.backgroundColor = color;

    const pokeInnerHTML = `
        <div class="img-container">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" alt="${name}"/>
        </div>
        <div class="info">
            <span class="number">#${pokemon.id
							.toString()
							.padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Type: <span>${type}</span></small>
        </div>
        <div class="stats">
        <h1>Stats</h1>
        <div class = "flex">
        <ul>${stat}</ul>
        <ul>${base}</ul>

        </div>
        </div>`;
        pokemonEl.innerHTML = pokeInnerHTML;

    	poke_container.appendChild(pokemonEl);


};

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchItem = search.value;
    if (searchItem == "bug" || searchItem == "dark" || searchItem == "dragon" || searchItem == "electric" || searchItem == "fairy" || searchItem == "fighting" ||searchItem == "fire" ||searchItem == "flying" ||searchItem == "ghost" ||searchItem == "grass" ||searchItem == "ground" ||searchItem == "ice" ||searchItem == "normal" || searchItem == "poison" || searchItem == "psychic" || searchItem == "rock" || searchItem == "steel" ||searchItem =="water"){
        getPokeTypes(searchItem);
        search.value = "";

    if(searchItem)  {
        getPokemon(searchItem);
        search.value = "";
    }else if (searchItem == ""){
        pokemons = [];
        removePokemon();
        fetchPokemons();
    }
});
