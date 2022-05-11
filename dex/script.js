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
function myFunction(heart_num) {
    var favorited = document.getElementById(`heart-${heart_num}`).classList.contains("heart");
    var animations = [
        "heart",
        "main-circ",
        "grp1",
        "oval1-1",
        "oval2-1",
        "grp2",
        "oval1-2",
        "oval2-2",
        "grp3",
        "oval1-3",
        "oval2-3",
        "grp4",
        "oval1-4",
        "oval2-4",
        "grp5",
        "oval1-5",
        "oval2-5",
        "grp6",
        "oval1-6",
        "oval2-6",
        "grp7",
        "oval1-7",
        "oval2-7"
    ]
    if (favorited) {
        animations.forEach(id => {
            document.getElementById(`${id}-${heart_num}`).classList.remove(id);
        })
    } else {
        animations.forEach(id => {
            document.getElementById(`${id}-${heart_num}`).classList.add(id);
        })
    }
}

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
        <div id="main-content">
            <div>
                <input type="checkbox" id="checkbox" onclick="myFunction('1')"/>
                <label for="checkbox">
                    <svg id="heart-svg" viewBox="467 392 58 57" xmlns="http://www.w3.org/2000/svg">
                        <g id="Group" fill="none" fill-rule="evenodd" transform="translate(467 392)">
                            <path d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z" id="heart-1" fill="#AAB8C2"/>
                            <circle id="main-circ-1" fill="#E2264D" opacity="0" cx="29.5" cy="29.5" r="1.5"/>
                            <g id="grp1-1" opacity="0" transform="translate(24)">
                                <circle id="oval1-1-1" fill="#9FC7FA" cx="2.5" cy="3" r="2"/>
                                <circle id="oval2-1-1" fill="#CC8EF5" cx="7.5" cy="2" r="2"/>
                            </g>
                            <g id="grp2-1" opacity="0" transform="translate(44 6)">
                                <circle id="oval1-2-1" fill="#F48EA7" cx="2" cy="2" r="2"/>
                                <circle id="oval2-2-1" fill="#8CE8C3" cx="5" cy="6" r="2"/>
                            </g>
                            <g id="grp3-1" opacity="0" transform="translate(52 28)">
                                <circle id="oval1-3-1" fill="#91D2FA" cx="4" cy="2" r="2"/>
                                <circle id="oval2-3-1" fill="#9CD8C3" cx="2" cy="7" r="2"/>
                            </g>
                            <g id="grp4-1" opacity="0" transform="translate(35 50)">
                                <circle id="oval1-4-1" fill="#F48EA7" cx="6" cy="5" r="2"/>
                                <circle id="oval2-4-1" fill="#CC8EF5" cx="2" cy="2" r="2"/>
                            </g>
                            <g id="grp5-1" opacity="0" transform="translate(14 50)">
                                <circle id="oval1-5-1" fill="#8CE8C3" cx="6" cy="5" r="2"/>
                                <circle id="oval2-5-1" fill="#9FC7FA" cx="2" cy="2" r="2"/>
                            </g>
                            <g id="grp6-1" opacity="0" transform="translate(0 28)">
                                <circle id="oval1-6-1" fill="#91D2FA" cx="2" cy="7" r="2"/>
                                <circle id="oval2-6-1" fill="#F48EA7" cx="3" cy="2" r="2"/>
                            </g>
                            <g id="grp7-1" opacity="0" transform="translate(7 6)">
                                <circle id="oval1-7-1" fill="#9CD8C3" cx="2" cy="6" r="2"/>
                                <circle id="oval2-7-1" fill="#8CE8C3" cx="5" cy="2" r="2"/>
                            </g>
                        </g>
                    </svg>
                </label>
            </div>
        </div>
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

    }else if(searchItem)  {
        getPokemon(searchItem);
        search.value = "";
    }else if (searchItem == ""){
        pokemons = [];
        removePokemon();
        fetchPokemons();
    }
});
