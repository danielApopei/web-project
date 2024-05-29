document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    const fullName = document.getElementById('name').value;
    const phoneNumber = document.getElementById('phone').value;
    const instituteSecretCode = document.getElementById('institute-code').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fullName, phoneNumber, instituteSecretCode, email, password })
    });

    const data = await response.json();

    if (response.ok) {
        alert('Registration successful');
        // You can also save the token to localStorage or sessionStorage if needed
        localStorage.setItem('token', data.token);
        // Redirect to a login page or dashboard
        window.location.href = '/admin_login.html'; // Replace with your login page or dashboard
    } else {
        alert(data.message || 'Registration failed');
    }
});
