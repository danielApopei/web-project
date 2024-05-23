fetch('http://localhost:5000/api/inmates')
    .then(response => response.json())
    .then(data => {
        // Get the table body
        const tbody = document.getElementById('list-section').getElementsByTagName('tbody')[0];

        // Loop through the data and create a new row for each item
        data.forEach(item => {
            const row = document.createElement('tr');
            row.className = 'list-section__list-item';

            // Add the name to the row
            const name = document.createElement('td');
            name.textContent = item.name;
            name.className = 'list-section__list-item__name';
            row.appendChild(name);

        tbody.appendChild(row);
    });
});

let inmateList = [];
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

    fetch('http://localhost:5000/api/inmates')
        .then(response => response.json())
        .then(data => {
            inmateList = data.map(item => item.name);
            filteredList = inmateList;
            loadInmateList();
            setupSearchBox();
        });
}

document.addEventListener("readystatechange", setupStuff);

