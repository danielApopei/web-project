document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
        alert('Login successful');
        // You can also save the token to localStorage or sessionStorage if needed
        localStorage.setItem('token', data.token);
        // Redirect to a protected page or dashboard
        window.location.href = '/admin_inmate_list.html'; // Replace with your protected page
    } else {
        alert(data.message || 'Login failed');
    }
});