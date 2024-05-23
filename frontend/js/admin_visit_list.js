// let visitList = [
//     "James Wilkinson",
//     "Kelly Pickle",
//     "Ronald Kenney",
//     "Alberto Comeau",
//     "Pamela Grigg",
//     "Paul Garza",
//     "Carmen Myers",
//     "David Fletcher",
//     "Helen Rose",
//     "Sophie Lee",
//     "Paula Wyckoff"
// ];
// let visitorList = [
//     "Karla Newman",
//     "Janice Tavares",
//     "Edward Daugherty",
//     "John Little",
//     ""
// ]
// let visitGrid = null;
// let searchBox = null;
// let filteredList = visitList;

// function loadVisitList() {
//     visitGrid.innerHTML = "";
//     filteredList.sort();
//     if(filteredList.length == 0) {
//         visitGrid.innerHTML = "No matching results!";
//         visitGrid.style.display = "flex";
//         visitGrid.style.justifyContent = "center";
//         visitGrid.style.flexDirection = "center";
//         return;
//     }
//     visitGrid.style.display = "grid";
//     for(let i = 0; i < filteredList.length; i++) {
//         let inmateLink = document.createElement("tr");
//         inmateLink.classList.add("list-item");
//         let inmateName = document.createElement("td");
//         visitGrid.appendChild(inmateLink);
//         inmateName.textContent = filteredList[i];
//         inmateName.classList.add("inmate-name");
//         inmateLink.appendChild(inmateName);
//     }
// }

// function setupSearchBox() {
//     searchBox.addEventListener("input", () => {
//         filteredList = visitList.filter((name) => {
//             return name.toLowerCase().includes(searchBox.value.toLowerCase());
//         });
//         loadVisitList();
//     });
// }

// function setupStuff() {
//     visitGrid = document.getElementById("list-section");
//     searchBox = document.getElementById("inmate-name-filter");
//     loadVisitList();
//     setupSearchBox();
// }

// document.addEventListener("readystatechange", setupStuff);


fetch('http://localhost:5000/api/visits')
    .then(response => response.json())
    .then(data => {
        // Get the table body
        const tbody = document.getElementById('list-section').getElementsByTagName('tbody')[0];

        // Loop through the data and create a new row for each item
        data.forEach(item => {
            const row = document.createElement('tr');
            row.className = 'list-section__list-item';

            // Create a new cell for each property
            const inmateCell = document.createElement('td');
            inmateCell.className = 'list-item__inmate-name';
            inmateCell.textContent = item.inmateName;
            row.appendChild(inmateCell);

            const visitorCell = document.createElement('td');
            visitorCell.className = 'list-item__visitor-name';
            visitorCell.textContent = item.visitorName;
            row.appendChild(visitorCell);

            const visitDateCell = document.createElement('td');
            visitDateCell.className = 'list-item__visit-date';
            visitDateCell.textContent = item.visitDate;
            row.appendChild(visitDateCell);

            const visitTimeCell = document.createElement('td');
            visitTimeCell.className = 'list-item__visit-time';
            visitTimeCell.textContent = item.visitDuration;
            row.appendChild(visitTimeCell);

            // Append the row to the table body
            tbody.appendChild(row);
        });
    })
    .catch(error => console.error('Error:', error));