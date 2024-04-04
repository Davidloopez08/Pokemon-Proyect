var offset = 1200;
var url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}`;

function mostrarPokemon(url){
    document.getElementById('button-back').style.display = "none";
    fetch(url)
    .then((res) => res.json())
    .then((response) => {
        const data = response.results
        data.forEach(pokemon => {
            fetch(pokemon.url)
                .then((res) => res.json())
                .then((response) => {
                    if (response.id.length == 1) {
                        response.id = '00' + response.id;
                    } else {
                        response.id = '0' + response.id;
                    }

                    const htmlBody = `
                        <div class="${response.types[0].type.name}">
                            <div class="pokemon-card">
                                <div>
                                ${response.sprites.front_default != null ? 
                                    `<img src="${response.sprites.front_default}">` : 
                                    `<img style="width: 50px; height: auto;" src="img/favicon.png">`}     
                                </div>
                                <div class="contenido-container">
                                    <div class="id-pokemon">
                                        #${response.id}
                                    </div>
                                    <div>
                                        <h3 style="opacity: 0.7;">${response.name}</h3>
                                    </div>
                                    <div">
                                    ${response.types.length > 1 ? 
                                        `<div><img src="img/type/${response.types[0].type.name}.svg" class="img-type"><img src="img/type/${response.types[1].type.name}.svg" class="img-type"></div>` : 
                                        `<div><img src="img/type/${response.types[0].type.name}.svg" class="img-type"></div>`}
                                </div>
                </div>
            </div>
        </div>  
    `;

    const div = document.createElement('div')
    div.innerHTML = htmlBody
    const pokedex = document.querySelector('#pokedex')
    pokedex.appendChild(div)
            })
    });  
    })
    .catch((error) => console.error("Error:", error))
}

mostrarPokemon(url);

function nextPokemon() {
    const pokedexSearch = document.getElementById('pokedexSearch');
    pokedexSearch.innerHTML = "";
    offset -= 40;
    var nextPageUrl = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}`;
    mostrarPokemon(nextPageUrl);    
}

document.addEventListener("DOMContentLoaded", function() {
    var navNext = document.getElementById("navigation-next");
    navNext.addEventListener("click", nextPokemon);
});



document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.querySelector('#search-input');
    const autocompleteSuggestions = document.querySelector('#autocomplete-suggestions');
    const pokedexSearch = document.querySelector('#pokedexSearch');
    const pokedex = document.querySelector('#pokedex');
    const searchButton = document.querySelector('.button-buscar');

    searchInput.addEventListener('input', autocomplete);

    function autocomplete() {
        const searchTerm = searchInput.value.toLowerCase();
        const url = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=2000`;

        fetch(url)
            .then((res) => res.json())
            .then((response) => {
                const data = response.results;

                const results = data.filter(pokemon => {
                    return pokemon.name.includes(searchTerm);
                });

                if (results.length > 0) {
                    autocompleteSuggestions.innerHTML = results.map(pokemon => {
                        return `<div class="autocomplete-suggestion">${pokemon.name}</div>`;
                    }).join('');
                    autocompleteSuggestions.style.display = 'block';
                } else {
                    autocompleteSuggestions.innerHTML = '';
                    autocompleteSuggestions.style.display = 'none';
                }
            })
            .catch((error) => console.error("Error:", error));
    }

    autocompleteSuggestions.addEventListener('click', function(event) {
        if (event.target.classList.contains('autocomplete-suggestion')) {
            searchInput.value = event.target.textContent;
            autocompleteSuggestions.style.display = 'none';
        }
    });

    searchButton.addEventListener('click', searchPokemon);

    function searchPokemon(event) {
        event.preventDefault();

        const searchTerm = searchInput.value.toLowerCase();
        const url = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=2000`;

        fetch(url)
            .then((res) => res.json())
            .then((response) => {
                const data = response.results;

                const results = data.filter(pokemon => {
                    return pokemon.name == searchTerm;
                });

                pokedexSearch.innerHTML = '';
                pokedex.innerHTML = '';

                results.forEach(pokemon => {
                    fetch(pokemon.url)
                        .then((res) => res.json())
                        .then((response) => {
                            const htmlBody = `
                                <div class="${response.types[0].type.name}">
                                    <div class="pokemon-card">
                                        <div>
                                            ${response.sprites.front_default != null ? 
                                                `<img src="${response.sprites.front_default}">` : 
                                                `<img style="width: 50px; height: auto;" src="img/favicon.png">`}     
                                        </div>
                                        <div class="contenido-container">
                                            <div class="id-pokemon">
                                                #${response.id}
                                            </div>
                                            <div>
                                                <h3 style="opacity: 0.7;">${response.name}</h3>
                                            </div>
                                            <div>
                                                ${response.types.map(type => `<img src="img/type/${type.type.name}.svg" class="img-type">`).join('')}
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
                            const div = document.createElement('div');
                            div.innerHTML = htmlBody;
                            pokedexSearch.appendChild(div);
                        });
                });
            })
            .catch((error) => console.error("Error:", error));
    }

    const buttonBack = document.querySelector('#button-back');
    const backButton = document.createElement('button');
    backButton.textContent = 'Back';
    backButton.classList.add('navigation-next');
    backButton.addEventListener('click', function() {
        document.getElementById('navigation-next').style.display = "block";
        document.getElementById('button-back').style.display = "none";
        pokedexSearch.innerHTML = "";
    });
    buttonBack.appendChild(backButton);

    // Cerrar sugerencias al hacer clic fuera del input
    document.addEventListener('click', function(event) {
        const clickedElement = event.target;
        if (!searchInput.contains(clickedElement)) {
            autocompleteSuggestions.style.display = 'none';
            const buttonSearch = document.getElementById('button-buscar-options')
            buttonSearch.style.display = "block";
        }
        
    });

    // Mostrar sugerencias al hacer clic en el input
    searchInput.addEventListener('click', function() {
        autocomplete();
        const buttonSearch = document.getElementById('button-buscar-options')
        buttonSearch.style.display = "none";
    });

    document.getElementById('search-input').value = "";
});







function backButton() {
    document.getElementById('navigation-next').style.display = "block";
    document.getElementById('button-back').style.display = "none";
    var divPokedex = document.getElementById('pokedex');
    divPokedex.innerHTML = "";
    var divPokedex = document.getElementById('pokedexSearch');
    divPokedex.innerHTML = "";
    mostrarPokemon(url)
}

document.addEventListener("DOMContentLoaded", function() {
    var navNext = document.getElementById("button-back");
    navNext.addEventListener("click", backButton);
});

/**
 * 
 * 
 * 
 * 
 * 
 * 
 */


document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.form-container-options form');
    const pokedex = document.querySelector('#pokedex');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const searchTerm = document.querySelector('.input-options').value;
        const url = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=2000`;

        document.getElementById('button-back').style.display = "block";
        document.getElementById('navigation-next').style.display = "none";
        var divPokedex = document.getElementById('pokedexSearch');
        divPokedex.innerHTML = "";
        var divPokedex = document.getElementById('pokedex');
        divPokedex.innerHTML = "";

        try {
            const res = await fetch(url);
            const response = await res.json();
            const data = response.results.slice(0, 40);

            for (const pokemon of data) {
                const resPokemon = await fetch(pokemon.url);
                const pokemonData = await resPokemon.json();
                const types = pokemonData.types.map(type => type.type.name);

                if (types.includes(searchTerm)) {
                    const htmlBody = `
                        <div class="${types[0]}">
                            <div class="pokemon-card">
                                <div>
                                ${pokemonData.sprites.front_default != null ? 
                                    `<img src="${pokemonData.sprites.front_default}">` : 
                                    `<img style="width: 50px; height: auto;" src="img/favicon.png">`}     
                                </div>
                                <div class="contenido-container">
                                    <div class="id-pokemon">
                                        #${pokemonData.id}
                                    </div>
                                    <div>
                                        <h3 style="opacity: 0.7;">${pokemonData.name}</h3>
                                    </div>
                                    <div>
                                        ${types.map(type => `<img src="img/type/${type}.svg" class="img-type">`).join('')}
                                    </div>
                                </div>
                            </div>
                        </div>`;
                    const div = document.createElement('div');
                    div.innerHTML = htmlBody;
                    pokedex.appendChild(div);
                }
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });

    const backButton = document.createElement('button');
    backButton.textContent = 'Back';
    backButton.classList.add('navigation-next');
    backButton.addEventListener('click', function() {
        document.getElementById('navigation-next').style.display = "block";
        document.getElementById('button-back').style.display = "none";
        pokedex.innerHTML = "";
        mostrarPokemon();
    });
});

function autocomplete(event) {
    console.log("Evento keydown");
  }
