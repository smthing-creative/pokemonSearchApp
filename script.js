const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const stats = document.getElementById("stats");
const results = document.getElementById("results");

const validPokemon = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

const showStats = (data) => {
  const { name, id, weight, height, stats: stats_list } = data;

  const hp = stats_list.find(stat => stat.stat.name === "hp").base_stat;
  const attack = stats_list.find(stat => stat.stat.name === "attack").base_stat;
  const defense = stats_list.find(stat => stat.stat.name === "defense").base_stat;
  const specialAttack = stats_list.find(stat => stat.stat.name === "special-attack").base_stat;
  const specialDefense = stats_list.find(stat => stat.stat.name === "special-defense").base_stat;
  const speed = stats_list.find(stat => stat.stat.name === "speed").base_stat;
  
     document.getElementById("pokemon-name").textContent= `${name}`;
document.getElementById("pokemon-id").textContent= `#${id}`;
document.getElementById("weight").textContent= `Weight: ${weight}`;
document.getElementById("height").textContent= `Height: ${height}`;


img.innerHTML= `<img id="sprite" src="${data.sprites.front_default}">`;


document.getElementById("hp").textContent= `${hp}`;
document.getElementById("attack").textContent= `${attack}`; 
document.getElementById("defense").textContent= `${defense}`;
document.getElementById("special-attack").textContent= `${specialAttack}`;
document.getElementById("special-defense").textContent= `${specialDefense}`;
document.getElementById("speed").textContent= `${speed}`; 
};

const showType = (data) => {
  const { name, types: types_list } = data;
  const typeList = [];

  // Extract type names and push them into the typeList array
  types_list.forEach(type => {
    typeList.push(type.type.name);
  });

  // Get the "types" element
  const typesElement = document.getElementById("types");

  // Clear the contents of the "types" element
  typesElement.innerHTML = "";

  // If there's only one type, create a single <p> element
  if (typeList.length === 1) {
    const typeElement = document.createElement("p");
    typeElement.textContent = typeList[0];
    typesElement.appendChild(typeElement);
  } else {
    typeList.forEach(typeName => {
      const typeElement = document.createElement("p");
      typeElement.textContent = typeName;
      typesElement.appendChild(typeElement);
    });
  }

  typeList.length = 0;
};



const searchAPI = () => {

  const cleanedInput = searchInput.value.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
  const query = cleanedInput;

  fetch(`${validPokemon}/${encodeURIComponent(query)}`)
    .then(response => {
      if (!response.ok) {
        alert("Pokémon not found");
      }
      return response.json();
    })
    .then(data => {
      if (data) {
        showStats(data);
        showType(data);
      } else {
        alert("Pokémon not found");
      }
    })
    .catch(err => {
      console.log(err);
    });
}

searchBtn.addEventListener("click", () => {
  searchAPI();
});
