const form = document.querySelector('form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const login = document.querySelector('#login').value;
        const password = document.querySelector('#password').value;
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ login, password }),
        });
        if (response.ok) {
            window.location.href = '/secure.html';
        } else {
            alert('Invalid login or password');
        }
    });