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
    // filteredList.sort();
    // sort list by name
    filteredList.sort((a, b) => {
        return a.name > b.name ? 1 : -1;
    });

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
        inmateLink.textContent = filteredList[i].name;
        inmateLink.href = `admin_inmate_info.html?id=${filteredList[i].id}`;
        inmateLink.style.textDecoration = "none";
        inmateLink.style.color = "black";
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

    // check localStorage for token. if nonexistent, redirect to admin_login.html
    if(!localStorage.getItem('token')) {
        window.location.href = 'admin_login.html';
    }
    

    fetch('http://localhost:5000/api/inmates', {
        headers:{
            'authorization': localStorage.getItem('token')
        }
    
    })
        .then(response => {
            console.log("response status: ", response.status);
            if(response.status === 401) {
                window.location.href = 'admin_login.html';
                throw new Error('Unauthorized');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            inmateList = data;
            filteredList = inmateList;
            loadInmateList();
            setupSearchBox();
        })
        .catch(error => console.error('Error:', error));
}

document.addEventListener("readystatechange", setupStuff);

