document.getElementById('reset-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var urlParams = new URLSearchParams(window.location.search);
    var token = urlParams.get('token');

    var password = document.getElementById('password').value;
    console.log("ok! gonna reset password: ", password, " with token: ", token);

    fetch('http://localhost:5000/api/reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: token,
            password: password,
        }),
    })
    .then(response => response.json())
    .then(data => {
        // Handle response
        alert("ok!");
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});