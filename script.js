const searchBtn = document.querySelector('.search');
const searchInput = document.getElementById('my-input');
const searchResult = document.getElementById('search-result');

searchBtn.addEventListener('click', () => {
    const query = searchInput.value.toLowerCase().trim();
    if (!query) return;

    fetchPokemon(query);
});

async function fetchPokemon(query) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);

        if (!response.ok) {
            throw new Error('Pokemon not found');
        }

        const data = await response.json();
        displayPokemon(data);
        
        
    } catch (error) {
        searchResult.innerHTML = `<p style="color: red; text-align: center;">Pokemon not found. Please try again.</p>`;
    }
}

function displayPokemon(data) {
    const { name, sprites, types, abilities } = data;
    const typeNames = types.map(typeInfo => typeInfo.type.name).join(', ');
    const abilityNames = abilities.map(abilityInfo => abilityInfo.ability.name).join(', ');

    const html = `
        <div style="text-align: center; color: white;">
            <img src="${sprites.front_default}" alt="${name}" width="150" height="150">
            <h2 style="text-transform: capitalize;">${name}</h2>
            <p><strong>Type:</strong> ${typeNames}</p>
            <p><strong>Abilities:</strong> ${abilityNames}</p>
        </div>
    `;

    searchResult.innerHTML = html;
}

const signinBtn = document.querySelector('.signin');
const footerSection = document.querySelector('footer');

if (signinBtn && footerSection) {
    signinBtn.addEventListener('click', (e) => {
        e.preventDefault();
        footerSection.scrollIntoView({ behavior: 'smooth' });
    });
}

console.log("Script loaded successfully.");

const container = document.getElementById("pokemon-container");

async function loadPokemon() {
  for (let i = 1; i <= 8; i++) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const data = await res.json();

    const card = document.createElement("div");
    card.classList.add("pokemon-card");

    card.innerHTML = `
      <img src="${data.sprites.front_default}">
      <h3>${data.name}</h3>
      <p>${data.types.map(t => t.type.name).join(", ")}</p>
    `;

    card.addEventListener("click", () => {
      document
        .querySelectorAll(".pokemon-card")
        .forEach(c => c.classList.remove("active"));
      card.classList.add("active");
    });

    container.appendChild(card);
  }
}

loadPokemon();
