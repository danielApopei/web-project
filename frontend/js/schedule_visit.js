const form = document.getElementById('visitForm');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    let visitorName = document.getElementById('visitorName').value;
    let inmateName = document.getElementById('inmateName').value;
    let visitorEmail = document.getElementById('visitorEmail').value;
    let visitorPhone = document.getElementById('visitorPhone').value;
    let visitDate = document.getElementById('visitDate').value;
    let visitDuration = document.getElementById('visitDuration').value;
    let natureOfVisit = document.getElementById('natureOfVisit').value;
    let relationship = document.getElementById('relationship').value;


    let visitData = {
        visitorName: visitorName,
        inmateName: inmateName,
        visitorEmail: visitorEmail,
        visitorPhone: visitorPhone,
        visitDate: visitDate,
        visitDuration: visitDuration,
        natureOfVisit: natureOfVisit,
        relationship: relationship
    };

    fetch('http://localhost:5000/api/visits', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(visitData)
    }).then(response => response.json())
    .then(data => {
        console.log(data)
        alert('Visit scheduled successfully!');
    })
    .catch(error => console.log('Error: ', error)
    )


    console.log('Form submitted');
});
