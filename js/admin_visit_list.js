let visitList = [
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
let visitGrid = null;
let searchBox = null;
let filteredList = visitList;

function loadVisitList() {
    visitGrid.innerHTML = "";
    filteredList.sort();
    if(filteredList.length == 0) {
        visitGrid.innerHTML = "No matching results!";
        visitGrid.style.display = "flex";
        visitGrid.style.justifyContent = "center";
        visitGrid.style.flexDirection = "center";
        return;
    }
    visitGrid.style.display = "grid";
    for(let i = 0; i < filteredList.length; i++) {
        let inmateLink = document.createElement("a");
        inmateLink.classList.add("list-item");
        let inmateName = document.createElement("div");
        visitGrid.appendChild(inmateLink);
        inmateName.textContent = filteredList[i];
        inmateName.classList.add("inmate-name");
        inmateLink.appendChild(inmateName);
    }
}

function setupSearchBox() {
    searchBox.addEventListener("input", () => {
        filteredList = visitList.filter((name) => {
            return name.toLowerCase().includes(searchBox.value.toLowerCase());
        });
        loadVisitList();
    });
}

function setupStuff() {
    visitGrid = document.getElementById("list-section");
    searchBox = document.getElementById("inmate-name-filter");
    loadVisitList();
    setupSearchBox();
}

document.addEventListener("readystatechange", setupStuff);

