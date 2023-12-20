const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const maxRecords = 151;
const limit = 12;
let offset = 0;

// class IdPokemon{
//     idPoke(id) {
//         // console.log(id)
//         idDoPokemonClicado = id
//     }
// }



function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml= pokemons.map((pokemon) => `
            <a id="${pokemon.number}" href="assets\\pages\\detail.html?id=${pokemon.number}">
                <li class="pokemon ${pokemon.type}">

                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>
                    
                    <div class="detail">

                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}<li>`).join('')}
                        </ol>

                        <img src="${pokemon.photo}" alt="${pokemon.name}">

                    </div>

                </li>
            </a>
            
        `).join('')

        pokemonList.innerHTML += newHtml

        // pokemons.forEach((pokemon) => {
        //     const elementoPokemon = document.getElementById(pokemon.number);
        //     if (elementoPokemon) {
        //         elementoPokemon.addEventListener('click', () => {
        //             // event.preventDefault();
        //             idDoPokemonClicado = pokemon.number;
        //             // idPoke(idDoPokemonClicado);
        //         });
        //     }
        // });
    });
}

loadPokemonItems(offset, limit)


loadMoreButton.addEventListener('click', () => {
    offset+=limit

    const qtdRecordsNextPage = offset + limit

    if (qtdRecordsNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItems(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItems(offset, limit)
    }

})