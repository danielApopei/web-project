let inmateList = [
    "James Wilkinson",
    "Kelly Pickle",
    "Ronald Kenney",
    "Alberto Comeau",
    "Pamela Grigg",
    "Paul Garza",
    "Carmen Myers",
    "David Fletcher",
    "Helen Rose",
    "Sophie Lee",
    "Paula Wyckoff"
];
let inmateGrid = null;
let searchBox = null;
let filteredList = inmateList;

function loadInmateList() {
    inmateGrid.innerHTML = "";
    filteredList.sort();
    if(filteredList.length == 0) {
        inmateGrid.innerHTML = "No matching results!";
        inmateGrid.style.display = "flex";
        inmateGrid.style.justifyContent = "center";
        inmateGrid.style.flexDirection = "center";
        return;
    }
    inmateGrid.style.display = "grid";
    for(let i = 0; i < filteredList.length; i++) {
        let inmateLink = document.createElement("a");
        inmateLink.textContent = filteredList[i];
        inmateLink.classList.add("inmate-grid__inmate-item");
        inmateGrid.appendChild(inmateLink);
    }
}

function setupSearchBox() {
    searchBox.addEventListener("input", () => {
        filteredList = inmateList.filter((name) => {
            return name.toLowerCase().includes(searchBox.value.toLowerCase());
        });
        loadInmateList();
    });
}

function setupStuff() {
    inmateGrid = document.getElementById("inmate-grid");
    searchBox = document.getElementById("search-box");
    loadInmateList();
    setupSearchBox();
}

document.addEventListener("readystatechange", setupStuff);

