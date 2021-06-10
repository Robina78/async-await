$(function() {
    let baseUrl = 'https://pokeapi.co/api/v2'

    // Part 1
    async function getPokemom() {
    let resp = await $.getJSON(`${baseUrl}/pokemon/?limit=1000`)
    console.log(resp)
    }


    // Part 2
    async function randomPokemon() {

        let response = await $.getJSON(`${baseUrl}/pokemon/?limit=1000`);
        console.log(response)
        let randomUrls =[];
        for (let i = 0; i < 3; i++) {
            let randomIdx = Math.floor(Math.random() * response.results.length);
            let url = response.results.splice(randomIdx, 1)[0].url;
            randomUrls.push(url);
            //console.log(randomUrls)
        }

        let pokemonData = await Promise.all(
            randomUrls.map(url => $.getJSON(url))
        );
        pokemonData.forEach(p => console.log(p));
    }


// Part 3
    async function morePokemonReq() {
        let allresp = await $.getJSON(`${baseUrl}/pokemon/?limit=1000`);
        let randomUrls = [];
        for(let i = 0; i < 3; i++) {
            let randomIdx = Math.floor(Math.random() * allresp.results.length);
            let url = allresp.results.splice(randomIdx,1)[0].url;
            randomUrls.push(url)
        }

        let pokemonData = await Promise.all(
            randomUrls.map(url => $.getJSON(url))
        );
        console.log(pokemonData)
        let speciesData = await Promise.all(
            pokemonData.map(p => $.getJSON(p.species.url))
        )
        console.log(speciesData)
        descriptions = speciesData.map(d => {
            let descriptionObj = d.flavor_text_entries.find(
                entry => entry.language.name === 'en');

                return descriptionObj
                ? descriptionObj.flavor_text 
                : "No description available."
        });
        descriptions.forEach((desc, i) => {
            console.log(`${pokemonData[i].name}: ${desc}`);
        });

    };



//Part 4

    let $btn = $("button");
    let $pokeArea = $("#pokemon-area");

    $btn.on("click", async function () {
        $pokeArea.empty();
        let allresp = await $.getJSON(`${baseUrl}/pokemon/?limit=1000`);
        console.log(allresp)
        let randomUrls = [];
        for(let i = 0; i < 3; i++) {
            let randomIdx = Math.floor(Math.random() * allresp.results.length);
            let url = allresp.results.splice(randomIdx,1)[0].url;
            randomUrls.push(url)
        }
        console.log(randomUrls)

        let pokemonData = await Promise.all(
            randomUrls.map(url => $.getJSON(url))
        );
        console.log(pokemonData)
        let speciesData = await Promise.all(
            pokemonData.map(p => $.getJSON(p.species.url))
        )
        
        speciesData.forEach((d, i) => {
            let descriptionObj = d.flavor_text_entries.find(function(entry) {
              return entry.language.name === "en";
            });

            let description = descriptionObj ? descriptionObj.flavor_text : "";
            let name = pokemonData[i].name;
            let imgSrc = pokemonData[i].sprites.front_default;
            $pokeArea.append(makePokeCard(name, imgSrc, description)); 
            console.log(name, imgSrc, description) 
        });
    });    
    
    function makePokeCard(name, imgSrc, description) {
        return `
        <div class="card">
            <h1>${name}</h1>
            <img src=${imgSrc} />
            <p>${description}</p>
        </div>
        `;
    }


})
    