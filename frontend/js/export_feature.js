function exportHTML() {
    const inmateName = document.getElementById('general-info-panel__inmate-name').textContent;
    const inmateId = document.getElementById('general-info-panel__inmate-id').textContent;
    const inmateGender = document.getElementById('general-info-panel__gender').textContent;
    const inmateCrime = document.getElementById('sentence-panel__crime').textContent;
    const entryDate = document.getElementById('sentence-panel__entry-date').textContent;
    const releaseDate = document.getElementById('sentence-panel__release-date').textContent;
    const address = document.getElementById('general-info-panel__address').textContent;
    const birthdate = document.getElementById('general-info-panel__date-of-birth').textContent;

    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Inmate Info</title>
            <style>
                body{
                    background-color: #67C6E3;
                }
            </style>
        </head>
        <body>
            <h3>REPORT GENERATED AT: </h3>
            <h1>Inmate: ${inmateName}</h1>
            <p>Inmate number: ${inmateId}</p>
            <p>Inmate gender: ${inmateGender}</p>
            <p>${inmateCrime}</p>
            <p>${entryDate}</p>
            <p>${releaseDate}</p>
            <p>${address}</p>
            <p>${birthdate}</p>

        </body>
        </html>
    `;

    const blob = new Blob([htmlContent], { type: "text/html" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);

    link.download = "exported.html";
    link.click();
}


function exportCSV() {
    const inmateName = document.getElementById('general-info-panel__inmate-name').textContent;
    const inmateId = document.getElementById('general-info-panel__inmate-id').textContent.replace('[Inmate #', '').replace(']', '');
    const inmateGender = document.getElementById('general-info-panel__gender').textContent.replace('Gender: ', '');
    const inmateCrime = document.getElementById('sentence-panel__crime').textContent;
    const entryDate = new Date(document.getElementById('sentence-panel__entry-date').textContent).toLocaleDateString();
    const releaseDate = new Date(document.getElementById('sentence-panel__release-date').textContent).toLocaleDateString();
    const address = document.getElementById('general-info-panel__address').textContent;
    const birthdate = document.getElementById('general-info-panel__date-of-birth').textContent;

    let csvContent = `inmateName, inmateId, inmateGender, inmateCrime, entryDate, releaseDate, address, birthdate\n${inmateName}, ${inmateId}, ${inmateGender}, ${inmateCrime}, ${entryDate}, ${releaseDate}, ${address}, ${birthdate}`;

    const blob = new Blob([csvContent], { type: "text/csv" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "exported.csv";
    link.click();
}

function exportJSON() {
    const inmateName = document.getElementById('general-info-panel__inmate-name').textContent;
    const inmateId = document.getElementById('general-info-panel__inmate-id').textContent.replace('[Inmate #', '').replace(']', '');
    const inmateGender = document.getElementById('general-info-panel__gender').textContent.replace('Gender: ', '');
    const inmateCrime = document.getElementById('sentence-panel__crime').textContent;
    const entryDate = new Date(document.getElementById('sentence-panel__entry-date').textContent).toLocaleDateString();
    const releaseDate = new Date(document.getElementById('sentence-panel__release-date').textContent).toLocaleDateString();
    const address = document.getElementById('general-info-panel__address').textContent;
    const birthdate = document.getElementById('general-info-panel__date-of-birth').textContent;

    let inmateData = {
        inmateName,
        inmateId,
        inmateGender,
        inmateCrime,
        entryDate,
        releaseDate,
        address,
        birthdate
    };

    let jsonContent = JSON.stringify(inmateData, null, 2);

    const blob = new Blob([jsonContent], { type: "application/json" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "exported.json";
    link.click();
}

function main() {
    const htmlExportButton = document.getElementById("html-button");
    const csvExportButton = document.getElementById("csv-button");
    const jsonExportButton = document.getElementById("json-button");
    htmlExportButton.addEventListener("click", exportHTML);
    csvExportButton.addEventListener("click", exportCSV);
    jsonExportButton.addEventListener("click", exportJSON);
    
}

document.addEventListener("readystatechange", main);