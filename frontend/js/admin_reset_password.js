document.getElementById('resetPasswordForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var email = document.getElementById('email').value;
    console.log("ok! gonna send email: ", email);
  
    fetch('http://localhost:5000/api/reset_password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
    .then(response => {
      console.log('Response:', response);
      return response.json();
    })
    .then(data => {
      console.log('Data:', data);
      alert(data.message);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});