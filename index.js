document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("button").addEventListener("click", generarPokemon)
    document.getElementById("pokemonInput").addEventListener("keydown", (e) => {
        if (e.key == "Enter") generarPokemon(e)
    })
})

async function generarPokemon(e) {
    const pokemonInput = document.getElementById("pokemonInput")
    const pokemonContainer = document.getElementById("pokemon")
    const errorContainer = document.getElementById("error")
    const bienvenidaContainer = document.getElementById("bienvenida")
    const statsContainer = document.querySelectorAll(".estadistica")
    e.preventDefault()

    let pokemon = {}
    let pokemonSpecies = {}
    let pokemonEncontrado = false
    
    await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonInput.value}`)
        .then(res => res.json())
        .then(data => {
            pokemon = data
            pokemonEncontrado = true
        })
        .catch(e => {
            console.error(`Hubo un error inesperado: ${e}`)
        })
    
    await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonInput.value}`)
        .then(res => res.json())
        .then(data => {
            pokemonSpecies = data
            pokemonEncontrado = true
        })
        .catch(e => {
            console.error(`Hubo un error inesperado: ${e}`)
        })

    if (pokemonEncontrado) {
        document.getElementById("nombrePokemon").innerHTML = pokemon.name[0].toUpperCase() + pokemon.name.substring(1)
        document.getElementById("imagenPokemon").src = pokemon.sprites.other["official-artwork"].front_default
        document.getElementById("imagenPokemonShiny").src = pokemon.sprites.other["official-artwork"].front_shiny
    
        pokemon.stats.forEach((e, i) => {
            statsContainer[i].textContent = e.base_stat
        })    
    
        document.getElementById("audio-pokemon-latest").src = pokemon.cries.latest
    
        const colorPokemon = pokemonSpecies.color.name
    
        document.getElementsByTagName("main")[0].style.backgroundColor = colorPokemon
    
        document.querySelectorAll("th").forEach(e => {
            e.style.backgroundColor = colorPokemon
            if (colorPokemon == "black") {
                e.style.color = "white"
            } else {
                e.style.color = "black"
            }
        })
    
        pokemonContainer.style.display = "flex"
        errorContainer.style.display = "none"
    } else {
        pokemonContainer.style.display = "none"
        errorContainer.style.display = "flex"
    }

    bienvenidaContainer.style.display = "none"
}