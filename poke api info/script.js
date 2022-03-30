const poke_container = document.getElementById('poke_container');
const pokemons_number = 151;
const colors = {
  bug: '#007524',
  dark: '#3D3D39',
  dragon: '#269191',
  electric: '#F7FF26',
  fairy: '#BF2A74',
  fighting: '#8C510D',
  fire: '#FF0000',
  flying: '#256E99',
  ghost: '#490E61',
  grass: '#39BD20',
  ground: '#995D4B',
  ice: '#ABFFFA',
  normal: '#CCCCCC',
  poison: '#931DC4',
  psychic: '#A8278E',
  rock: '#472B23',
  steel: '#6B6B6B',
  water: '#008FFF',
};

const main_types = Object.keys(colors);

const fetchPokemons = async () => {
	for (let i = 1; i <= pokemons_number; i++) {
		await getPokemon(i);
	}
};

const getPokemon = async id => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	const pokemon = await res.json();
	createPokemonCard(pokemon);
};

function createPokemonCard(pokemon) {
	const pokemonEl = document.createElement('div');
	pokemonEl.classList.add('pokemon');

	const poke_types = pokemon.types.map(type => type.type.name);
	const type = main_types.find(type => poke_types.indexOf(type) > -1);
	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	const color = colors[type];

	pokemonEl.style.backgroundColor = color;

	const pokeInnerHTML = `
        <div class="img-container">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${name}" />
        </div>
        <div class="info">
            <span class="number">#${pokemon.id
							.toString()
							.padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Type: <span>${type}</span></small>
        </div>
    `;

	pokemonEl.innerHTML = pokeInnerHTML;

	poke_container.appendChild(pokemonEl);
}

fetchPokemons();
