document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Example: Send login credentials to backend and obtain token
    const requestBody = {
        email: email,
        password: password
    };

    fetch('https://jade-nice-deer.cyclic.app/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Login failed');
            }
            return response.json();
        })
        .then(data => {
            // Assuming the backend responds with a token
            const token = data.token;

            // Example: Store the token in localStorage
            localStorage.setItem('token', token);

            // Redirect to the map page after successful login
            window.location.href = 'map.html';
        })
        .catch(error => {
            console.error('Login error:', error);
            // Handle login error (e.g., display error message)
        });
});
