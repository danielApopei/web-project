function exportHTML() {
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
            <h1>James Wilkinson</h1>
            <p>Inmate number: #387211</p>
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
    alert("CSV exports not available yet!");
}

function exportJSON() {
    alert("JSON exports not available yet!");
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