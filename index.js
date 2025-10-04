document.addEventListener("DOMContentLoaded", () => {
    
    document.querySelector("button").addEventListener("click", generarPokemon)
    document.getElementById("pokemonInput").addEventListener("keydown", (e) => {
        if (e.key == "Enter") generarPokemon(e)
    })
})

async function generarPokemon(e) {
    const pokemonInput = document.getElementById("pokemonInput")
    const pokemon = document.getElementById("pokemon")
    e.preventDefault()
    
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonInput.value}`)
        .then(res => res.json())
        .then(data => { 
            const nombre = data.forms[0].name
            const stats = data.stats
            const cries = data.cries

            document.getElementById("nombrePokemon").innerHTML = nombre[0].toUpperCase() + nombre.substring(1)
            document.getElementById("imagenPokemon").src = data.sprites.versions['generation-ii'].crystal.front_default
            document.getElementById("imagenPokemonShiny").src = data.sprites.versions['generation-ii'].crystal.front_shiny

            document.getElementById("estadistica-vida").innerHTML = stats.find(e => e.stat.name == "hp").base_stat
            document.getElementById("estadistica-ataque").innerHTML = stats.find(e => e.stat.name == "attack").base_stat
            document.getElementById("estadistica-ataque-especial").innerHTML = stats.find(e => e.stat.name == "special-attack").base_stat
            document.getElementById("estadistica-defensa").innerHTML = stats.find(e => e.stat.name == "defense").base_stat
            document.getElementById("estadistica-defensa-especial").innerHTML = stats.find(e => e.stat.name == "special-defense").base_stat
            document.getElementById("estadistica-velocidad").innerHTML = stats.find(e => e.stat.name == "speed").base_stat

            document.getElementById("audio-pokemon-latest").src = cries.latest
            document.getElementById("audio-pokemon-legacy").src = cries.legacy

        })
        .catch(e => {
            console.error(`Hubo un error inesperado: ${e}`)
        })
    
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonInput.value}`)
        .then(res => res.json())
        .then(data => {
            document.querySelector("main").style.backgroundColor = data.color.name
            document.querySelectorAll("th").forEach(e => {
                e.style.backgroundColor = data.color.name
            })
        })
        .catch(e => {
            alert("¡No ha sido encontrado el pokémon!")
            console.error(`Hubo un error inesperado: ${e}`)
        })

    pokemon.style.display = "flex"
}