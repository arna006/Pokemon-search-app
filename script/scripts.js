const searchInput = document.getElementById("searchTxt");
const resultDiv = document.getElementById("resultDiv");
const url = "https://pokeapi.co/api/v2/pokemon/";

async function showPokemons() {
    const searchValue = searchInput.value.toLowerCase().trim();
    if (!searchValue) {
        resultDiv.innerHTML = "<p>Please enter a Pokemon name or ID.</p>";
        return;
    }

    try {
        const response = await fetch(url + searchValue);
        if (!response.ok) {
            throw new Error("Pokemon not found");
        }
        const pokemon = await response.json();
        resultDiv.innerHTML = `
        <div class="pokemon-card">
            <h3>${pokemon.name.toUpperCase()}</h3>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <p>Height: ${pokemon.height}</p>
            <p>Weight: ${pokemon.weight}</p>
            <p>Type: ${pokemon.types.map(type => `<span class="type-badge">${type.type.name}</span>`).join(" ")}</p>
            <p>Strength: ${pokemon.stats.find(stat => stat.stat.name === "attack")?.base_stat || "N/A"}</p>
            <p>Defense: ${pokemon.stats.find(stat => stat.stat.name === "defense")?.base_stat || "N/A"}</p>
            <p>Speed: ${pokemon.stats.find(stat => stat.stat.name === "speed")?.base_stat || "N/A"}</p>
        </div>
        `;
    } catch (error) {
        alert(error.message);
        resultDiv.innerHTML = "";
    }
}

async function loginUser() {
    const username = document.getElementById("login-txt").value;
    const password = document.getElementById("password-txt").value;

    const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        const message = await response.text();
        alert(message);
    } else {
        const error = await response.text();
        alert(error);
    }
}