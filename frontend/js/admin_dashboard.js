function setupStuff() {
    // check localStorage for token. if nonexistent, redirect to admin_login.html
    if(!localStorage.getItem('token')) {
        window.location.href = 'admin_login.html';
    }
}

document.addEventListener("readystatechange", setupStuff);