var url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=40";

function mostrarPokemon(){
    document.getElementById('button-back').style.display = "none";
    fetch(url)
    .then((res) => res.json())
    .then((response) => {
        const data = response.results
        const url = data
        data.forEach(pokemon => {
            fetch(pokemon.url)
                .then((res) => res.json())
                .then((response) => {
                    if (response.id.length == 1) {
                        response.id = '00' + response.id;
                    } else{
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

mostrarPokemon(url)


var offset = 0;
var limit = 40;

function nextPokemon() {
    offset += limit;
    var nextPageUrl = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
    mostrarPokemon(nextPageUrl);
}

document.addEventListener("DOMContentLoaded", function() {
    var navNext = document.getElementById("navigation-next");
    navNext.addEventListener("click", nextPokemon);
});



document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.form-container form');
    const pokedex = document.querySelector('#pokedexSearch');
    const buttonBack = document.querySelector('#button-back');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const searchTerm = document.querySelector('.input-buscar').value.toLowerCase();
        const url = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=2000`;

        document.getElementById('button-back').style.display = "block";
        document.getElementById('navigation-next').style.display = "none";
        var divPokedex = document.getElementById('pokedex');
        divPokedex.innerHTML = "";
        var divPokedex = document.getElementById('pokedexSearch');
        divPokedex.innerHTML = "";
        


        fetch(url)
            .then((res) => res.json())
            .then((response) => {
                const data = response.results;

                data.forEach(pokemon => {
                    if (pokemon.name.includes(searchTerm)) {
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
                                pokedex.appendChild(div);
                            });
                    }
                });
            })
            .catch((error) => console.error("Error:", error));
    });

    const htmlbuttonBack = `
                    <div>
                        <Button class="navigation-next">Back</Button>
                    </div>
                `;
                const divButton = document.createElement('div');
                divButton.innerHTML = htmlbuttonBack;
                buttonBack.appendChild(divButton);
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

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const searchTerm = document.querySelector('.input-options').value;
        const url = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=2000`;

        document.getElementById('button-back').style.display = "block";
        document.getElementById('navigation-next').style.display = "none";
        var divPokedex = document.getElementById('pokedexSearch');
        divPokedex.innerHTML = "";
        var divPokedex = document.getElementById('pokedex');
        divPokedex.innerHTML = "";

        fetch(url)
            .then((res) => res.json())
            .then((response) => {
                const data = response.results;

                data.forEach(pokemon => {
                    fetch(pokemon.url)
                        .then((res) => res.json())
                        .then((response) => {
                            const types = response.types.map(type => type.type.name);
                            if (types.includes(searchTerm)) {
                                const htmlBody = `
                                    <div class="${types[0]}">
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
                                                    ${types.map(type => `<img src="img/type/${type}.svg" class="img-type">`).join('')}
                                                </div>
                                            </div>
                                        </div>
                                    </div>`;
                                const div = document.createElement('div');
                                div.innerHTML = htmlBody;
                                pokedex.appendChild(div);
                            }
                        });
                });
            })
            .catch((error) => console.error("Error:", error));
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
