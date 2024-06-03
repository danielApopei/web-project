// first get param id from url
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
console.log('[DEBUG] id detected in URL: ', id);

// fetch inmate data using authorization token
let token = localStorage.getItem('token');
fetch('http://localhost:5000/api/inmates', {
    headers: {
        'authorization': `${token}`
    }
})
.then(response => response.json())
.then(data => {
    console.log(data);

    // select inmate with correct id
    let inmate = data.find(inmate => inmate.id == id);

    // if inmate not found
    if (!inmate) {
        // get .form-container
        const formContainer = document.querySelector('.form-container');
        formContainer.innerHTML = `<h2 class="form-container__error">Inmate with ID ${id} not found.</h2>
        <a href="admin_inmate_list.html" class="form-container__error">Back to Inmate List</a>`;
    }
    console.log('inmate: ', inmate);
    
    // get relevant inmate data
    const inmateName = document.getElementById('general-info-panel__inmate-name');
    const inmateId = document.getElementById('general-info-panel__inmate-id');
    const inmateGender = document.getElementById('general-info-panel__gender');
    const inmateCrime = document.getElementById('sentence-panel__crime');
    const entryDate = document.getElementById('sentence-panel__entry-date');
    const releaseDate = document.getElementById('sentence-panel__release-date');

    // set inmate data to html elements
    // set inmate data to html elements
    inmateName.textContent = inmate.name;
    inmateId.textContent = `[Inmate #${inmate.id}]`;
    inmateGender.textContent = `Gender: ${inmate.gender}`;
    inmateCrime.textContent = `Crime: ${inmate.convictedfor}`;

    let entry = new Date(inmate.entrydate);
    let release = new Date(inmate.releasedate);

    entryDate.textContent = `Entry Date: ${entry.toLocaleDateString()}`;
    releaseDate.textContent = `Release Date: ${release.toLocaleDateString()}`;
    // set interval to update timers
    setInterval(updateTimers, 1000);
    updateTimers();

});

function updateTimers() {
    let entryDateText = document.getElementById('sentence-panel__entry-date').textContent.split('(')[0];
    let entryDate = new Date(entryDateText);
    let releaseDateText = document.getElementById('sentence-panel__release-date').textContent.split('(')[0];
    let releaseDate = new Date(releaseDateText);
    // append to it the days, hours, minutes, seconds since entry
    let now = new Date();
    let diffEntry = now - entryDate;
    let daysEntry = Math.floor(diffEntry / (1000 * 60 * 60 * 24));
    let hoursEntry = Math.floor(diffEntry / (1000 * 60 * 60) % 24);
    let minutesEntry = Math.floor(diffEntry / (1000 * 60) % 60);
    let secondsEntry = Math.floor(diffEntry / 1000 % 60);
    let diffRelease = releaseDate - now;
    let daysRelease = Math.floor(diffRelease / (1000 * 60 * 60 * 24));
    let hoursRelease = Math.floor(diffRelease / (1000 * 60 * 60) % 24);
    let minutesRelease = Math.floor(diffRelease / (1000 * 60) % 60);
    let secondsRelease = Math.floor(diffRelease / 1000 % 60);

    let percentage = (diffEntry / (diffEntry + diffRelease)) * 100;
    let progressBar = document.getElementById('sentence-panel__panel-half-2__inner-loading');
    progressBar.style.width = `${percentage}%`;
    
    const entryDatePanel = document.getElementById('sentence-panel__entry-date');
    const releaseDatePanel = document.getElementById('sentence-panel__release-date');
    entryDatePanel.textContent = entryDateText + ` (${daysEntry}d, ${hoursEntry}h, ${minutesEntry}m, ${secondsEntry}s)`;
    releaseDatePanel.textContent = releaseDateText + ` (${daysRelease}d, ${hoursRelease}h, ${minutesRelease}m, ${secondsRelease}s)`;

}