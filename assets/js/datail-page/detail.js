var urlCompleta = window.location.href;
let idString = urlCompleta.split('=')[1]
let id = Number(idString)
const limit = 151
const buttonPrevious = document.getElementById('button-previous');
const buttonNext = document.getElementById('button-next');

const url = `https://pokeapi.co/api/v2/pokemon/${id}`
const urlPrev = `https://pokeapi.co/api/v2/pokemon/${id-1}`
const urlNext = `https://pokeapi.co/api/v2/pokemon/${id+1}`

function pokemonDetailCovertHtml(pokemon) {
    return `
    <section class="name">${pokemon.name}</section>
    <section class="bodyDetail ${pokemon.types.map((typeSlot) => typeSlot.type.name.split(','))[0]}">

        <section id="up">
            <div class="name-types">
                <div class="pokemon-name">
                    ${pokemon.name}
                </div>
                <div class="pokemon-types">
                    <ol>
                        ${pokemon.types.map((typeSlot) => `<li class ="${typeSlot.type.name}"> ${typeSlot.type.name} <li>`).join('')}
                    </ol>
                </div>
            </div>
            <div class="pokemon-number">
                #${pokemon.id}
            </div>
        </section>


        <section id="down">
            <div class="image">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg" alt="${pokemon.name}">
            </div>

            <div class="stats">
                <div>
                    <span>Base stats</span>
                    <ol>
                        <li>HP      ${pokemon.stats[0].base_stat} <progress value="${pokemon.stats[0].base_stat}" max="200">${pokemon.stats[0].base_stat} %</progress></li>
                        <li>Attack  ${pokemon.stats[1].base_stat} <progress value="${pokemon.stats[1].base_stat}" max="200">${pokemon.stats[1].base_stat} %</progress></li>
                        <li>Defense ${pokemon.stats[2].base_stat} <progress value="${pokemon.stats[2].base_stat}" max="200">${pokemon.stats[2].base_stat} %</progress></li>
                        <li>Sp. Atk ${pokemon.stats[3].base_stat} <progress value="${pokemon.stats[3].base_stat}" max="200">${pokemon.stats[3].base_stat} %</progress></li>
                        <li>Sp. Def ${pokemon.stats[4].base_stat} <progress value="${pokemon.stats[4].base_stat}" max="200">${pokemon.stats[4].base_stat} %</progress></li>
                        <li>Speed   ${pokemon.stats[5].base_stat} <progress value="${pokemon.stats[5].base_stat}" max="200">${pokemon.stats[5].base_stat} %</progress></li>
                        <li>Total   ${pokemon.stats[0].base_stat+pokemon.stats[1].base_stat+pokemon.stats[2].base_stat+pokemon.stats[3].base_stat+pokemon.stats[4].base_stat+pokemon.stats[5].base_stat} <progress value="${pokemon.stats[0].base_stat+pokemon.stats[1].base_stat+pokemon.stats[2].base_stat+pokemon.stats[3].base_stat+pokemon.stats[4].base_stat+pokemon.stats[5].base_stat}" max="1200">${pokemon.stats[0].base_stat+pokemon.stats[1].base_stat+pokemon.stats[2].base_stat+pokemon.stats[3].base_stat+pokemon.stats[4].base_stat+pokemon.stats[5].base_stat} %</progress></li>
                    </ol>
                </div>
                <div class="space"></div>
            </div>
        </section>`
}

function pokemonDetailPreviousCovertHtml(pokemon) {
    if (id-1 >= 0)
    return `
    <h2><button class="${pokemon.types.map((typeSlot) => typeSlot.type.name.split(','))[0]}">${pokemon.name}</button></h2>
    `
}

function pokemonDetailNextCovertHtml(pokemon) {
    return `
    <h2><button class = "${pokemon.types.map((typeSlot) => typeSlot.type.name.split(','))[0]}">${pokemon.name}</button></h2>
    `
}




const pokemonContent = document.getElementById('content')
const pokemonPrevious = document.getElementById('button-previous')
const pokemonNext = document.getElementById('button-next')

fetch(url)
    .then((response) => response.json()
    .then((pokemonDetail) => {
        const pokemon = pokemonDetail
        pokemonContent.innerHTML+=pokemonDetailCovertHtml(pokemon)
}));

if (id != 1) {
    fetch(urlPrev)
        .then((response) => response.json()
        .then((pokemonDetail) => {
            const pokemon = pokemonDetail
            pokemonPrevious.innerHTML=pokemonDetailPreviousCovertHtml(pokemon)
        }));
} else {
    pokemonPrevious.innerHTML=null
}   

if (id < limit){
    fetch(urlNext)
        .then((response) => response.json()
        .then((pokemonDetail) => {
            const pokemon = pokemonDetail
            pokemonNext.innerHTML=pokemonDetailNextCovertHtml(pokemon)
        }));
} else {
    pokemonNext.innerHTML=null    
}

function atualizarUrlEConteudo(id) {
    const novaUrl = window.location.origin + window.location.pathname + `?id=${id}`;
    history.pushState({ id }, null, novaUrl);

    atualizarConteudo(id);
}

function atualizarConteudo(id) {
    if (id >= 1 && id <= limit){
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const urlPrev = `https://pokeapi.co/api/v2/pokemon/${id-1}`;
        const urlNext = `https://pokeapi.co/api/v2/pokemon/${id+1}`;


        fetch(url)
            .then((response) => response.json())
            .then((pokemonDetail) => {
                const pokemon = pokemonDetail
                pokemonContent.innerHTML=pokemonDetailCovertHtml(pokemon)
            });

        if (id != 1) {
            fetch(urlPrev)
                .then((response) => response.json()
                .then((pokemonDetail) => {
                    const pokemon = pokemonDetail
                    pokemonPrevious.innerHTML=pokemonDetailPreviousCovertHtml(pokemon)
                }));
        } else {
            pokemonPrevious.innerHTML=null
        }   

        if (id < limit){
            fetch(urlNext)
                .then((response) => response.json()
                .then((pokemonDetail) => {
                    const pokemon = pokemonDetail
                    pokemonNext.innerHTML=pokemonDetailNextCovertHtml(pokemon)
                }));
        } else {
            pokemonNext.innerHTML=null    
        }
    }
}



buttonPrevious.addEventListener('click', () => {    
    if (id > 1) {    
        id -= 1;
        atualizarUrlEConteudo(id);
    }
});

buttonNext.addEventListener('click', () => {
    if (id < limit) {
        id += 1;
        atualizarUrlEConteudo(id);
    }
});

