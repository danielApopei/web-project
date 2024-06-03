
let visitInfoPanel = document.getElementById('visit-wrapper');
visitInfoPanel.style.display = 'none';
// see if url is of type /visit_info.html?id=1
// if so, get the id and the function to get the visit info
let url = new URL(window.location.href);
let id = url.searchParams.get('id');
if(id) {
    console.log("id: ", id);
    console.log("value: ", id);

    fetch(`http://localhost:5000/api/visit?id=${id}`)
        .then(response => {
            console.log("response status: ", response.status);
            if(response.status === 401) {
                window.location.href = 'admin_login.html';
                throw new Error('Unauthorized');
            }
            // Check if the response body is empty
            if (!response.ok || response.status === 204) {
                throw new Error('No content');
            }
            return response.json();
        })
        .then(data => {
            console.log("received: ", data);
            let { visitorname, inmatename, visitoremail, visitorphone, visitdate, visitduration, natureofvisit, relationship, complete, starting_time, end_time, transcript } = data;
            
            let visitorNameElement = document.getElementById('visitorName');
            let inmateNameElement = document.getElementById('inmateName');
            // let visitorEmailElement = document.getElementById('visitorEmail');
            // let visitorPhoneElement = document.getElementById('visitorPhone');
            // let visitDateElement = document.getElementById('visitDate');
            let visitDurationElement = document.getElementById('visitDuration');
            let natureOfVisitElement = document.getElementById('natureOfVisit');
            // let relationshipElement = document.getElementById('relationship');
            let completeElement = document.getElementById('complete');
            let starting_timeElement = document.getElementById('starting_time');
            let end_timeElement = document.getElementById('end_time');
            let transcriptElement = document.getElementById('transcript');
            let idElement = document.getElementById('id');

            idElement.innerHTML = '#' + id;
            visitorNameElement.innerHTML = visitorname;
            inmateNameElement.innerHTML = inmatename;
            // visitorEmailElement.innerHTML = visitoremail;
            // visitorPhoneElement.innerHTML = visitorphone;
            // visitDateElement.innerHTML = visitdate;
            visitDurationElement.innerHTML = visitduration;
            natureOfVisitElement.innerHTML = natureofvisit;
            // relationshipElement.innerHTML = relationship;
            completeElement.innerHTML = complete;
            starting_timeElement.innerHTML = starting_time;
            end_timeElement.innerHTML = end_time;
            transcriptElement.innerHTML = transcript;

            visitInfoPanel.style.display = 'flex';
            
        })
        .catch(error => console.error('Error:', error));
}
document.getElementById('search-button').addEventListener('click', function() {
    var id = document.getElementById('inmate-input').value;
    console.log("value: ", id);

    fetch(`http://localhost:5000/api/visit?id=${id}`)
        .then(response => {
            console.log("response status: ", response.status);
            if(response.status === 401) {
                window.location.href = 'admin_login.html';
                throw new Error('Unauthorized');
            }
            // Check if the response body is empty
            if (!response.ok || response.status === 204) {
                throw new Error('No content');
            }
            return response.json();
        })
        .then(data => {
            console.log("received: ", data);
            let { visitorname, inmatename, visitoremail, visitorphone, visitdate, visitduration, natureofvisit, relationship, complete, starting_time, end_time, transcript } = data;
            
            let visitorNameElement = document.getElementById('visitorName');
            let inmateNameElement = document.getElementById('inmateName');
            // let visitorEmailElement = document.getElementById('visitorEmail');
            // let visitorPhoneElement = document.getElementById('visitorPhone');
            // let visitDateElement = document.getElementById('visitDate');
            let visitDurationElement = document.getElementById('visitDuration');
            let natureOfVisitElement = document.getElementById('natureOfVisit');
            // let relationshipElement = document.getElementById('relationship');
            let completeElement = document.getElementById('complete');
            let starting_timeElement = document.getElementById('starting_time');
            let end_timeElement = document.getElementById('end_time');
            let transcriptElement = document.getElementById('transcript');
            let idElement = document.getElementById('id');
            let inmatePhotoTD = document.getElementById('inmatePhoto');
            let visitorPhotoTD = document.getElementById('visitorPhoto');
            // clear the innerHTML of the elements
            inmatePhotoTD.innerHTML = '';
            visitorPhotoTD.innerHTML = '';

            idElement.innerHTML = '#' + id;
            visitorNameElement.innerHTML = visitorname;
            inmateNameElement.innerHTML = inmatename;
            // create new img with src = 'https://firebasestorage.googleapis.com/v0/b/web-project-116cd.appspot.com/o/visits%2F' + id + '_inmateImage?alt=media&token=a21907ce-bfa8-4212-a422-8461dc87b272'
            // create new element img
            inmatePhoto = document.createElement('img');
            // set width to 2rem
            inmatePhoto.style.width = '10rem';
            inmatePhoto.src = 'https://firebasestorage.googleapis.com/v0/b/web-project-116cd.appspot.com/o/visits%2F' + id + '_inmateImage?alt=media&token=a21907ce-bfa8-4212-a422-8461dc87b272';
            // create new element img
            visitorPhoto = document.createElement('img');
            // set width to occupy all of the td
            visitorPhoto.style.width = '10rem';
            visitorPhoto.src = 'https://firebasestorage.googleapis.com/v0/b/web-project-116cd.appspot.com/o/visits%2F' + id + '_visitorImage?alt=media&token=1f2f7c3e-6c3c-4f9d-8a4b-9b3f8a6e8e6d';
            // append img to td
            inmatePhotoTD.appendChild(inmatePhoto);
            visitorPhotoTD.appendChild(visitorPhoto);
            // visitorEmailElement.innerHTML = visitoremail;
            // visitorPhoneElement.innerHTML = visitorphone;
            // visitDateElement.innerHTML = visitdate;
            visitDurationElement.innerHTML = visitduration;
            natureOfVisitElement.innerHTML = natureofvisit;
            // relationshipElement.innerHTML = relationship;
            completeElement.innerHTML = complete;
            starting_timeElement.innerHTML = starting_time;
            end_timeElement.innerHTML = end_time;
            transcriptElement.innerHTML = transcript;

            visitInfoPanel.style.display = 'flex';
            
        })
        .catch(error => console.error('Error:', error));
});


document.addEventListener('DOMContentLoaded', (event) => {
    const exportButtons = document.querySelectorAll('.visit-section__button');
    exportButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            switch(index) {
                case 0:
                    exportHTML();
                    break;
                case 1:
                    exportCSV();
                    break;
                case 2:
                    exportJSON();
                    break;
            }
        });
    });
});

function exportHTML() {
    // Get the table data
    const table = document.querySelector('.visit-section__table');
    const tableHTML = table.outerHTML;

    // Create a new Blob with the table HTML
    const blob = new Blob([tableHTML], { type: 'text/html' });

    // Create a link element
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'table.html';

    // Append the link to the body (required for Firefox)
    document.body.appendChild(link);

    // Simulate a click on the link
    link.click();

    // Remove the link from the body
    document.body.removeChild(link);

    console.log('Exporting as HTML...');
}

function exportCSV() {
    // Implement your logic for exporting as CSV
    // Get the table data
    const table = document.querySelector('.visit-section__table');
    const rows = Array.from(table.querySelectorAll('tr'));

    // Convert the table data to CSV
    const csv = rows.map(row => {
        const cols = Array.from(row.querySelectorAll('th, td'));
        return cols.map(col => `"${col.textContent}"`).join(',');
    }).join('\n');

    // Create a new Blob with the CSV
    const blob = new Blob([csv], { type: 'text/csv' });

    // Create a link element
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'table.csv';

    // Append the link to the body (required for Firefox)
    document.body.appendChild(link);

    // Simulate a click on the link
    link.click();

    // Remove the link from the body
    document.body.removeChild(link);
    console.log('Exporting as CSV...');
}

function exportJSON() {
    // Implement your logic for exporting as JSON
    // Get the table data
    const table = document.querySelector('.visit-section__table');
    const rows = Array.from(table.querySelectorAll('tr'));

    // Convert the table data to JSON
    const json = rows.map(row => {
        const cols = Array.from(row.querySelectorAll('th, td'));
        let obj = {};
        for(let i = 0; i < cols.length; i += 2) {
            obj[cols[i].textContent] = cols[i+1].textContent;
        }
        return obj;
    });

    // Create a new Blob with the JSON
    const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });

    // Create a link element
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'table.json';

    // Append the link to the body (required for Firefox)
    document.body.appendChild(link);

    // Simulate a click on the link
    link.click();

    // Remove the link from the body
    document.body.removeChild(link);
    console.log('Exporting as JSON...');
}
// hide for now