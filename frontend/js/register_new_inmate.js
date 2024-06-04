const form = document.getElementById('registerInmateForm');

// get token from localStorage
const token = localStorage.getItem('token');

// if not existent, redirect to login
if (!token) {
    window.location.href = 'admin_login.html';
}

form.addEventListener('submit', function(event) {
    event.preventDefault();

    let inmateName = document.getElementById('inmateName').value;
    let inmateCNP = document.getElementById('inmateCNP').value;
    let convictedFor = document.getElementById('convictedFor').value;
    let sentence = document.getElementById('sentence').value;
    let entryDate = document.getElementById('entryDate').value;
    let releaseDate = document.getElementById('releaseDate').value;
    let birthDate = document.getElementById('birthDate').value;
    let address = document.getElementById('address').value;
    let gender = document.getElementById('gender').value;
    let goods = document.getElementById('goods').value;
    let others = document.getElementById('others').value;

    let inmateData = {
        name: inmateName,
        CNP: inmateCNP,
        convictedFor: convictedFor,
        sentence: sentence,
        entryDate: entryDate,
        releaseDate: releaseDate,
        birthDate: birthDate,
        gender: gender,
        goods: goods,
        others: others,
        dateOfBirth: birthDate,
        address: address
    };

    let token = localStorage.getItem('token');

    fetch('http://localhost:5000/api/inmates', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
        body: JSON.stringify(inmateData)
    }).then(response => response.json())
    .then(data => {
        console.log(data)
        alert('Inmate registered successfully!');
    })
    .catch(error => console.log('Error: ', error));

    console.log('Form submitted');
});
