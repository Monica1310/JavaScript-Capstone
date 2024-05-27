document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('userForm');
    const message = document.getElementById('message');
    
    document.addEventListener('DOMContentLoaded', () => {
        const usernameInput = document.getElementById('username');
        const usernamePopup = document.getElementById('usernamePopup');
        const passwordInput = document.getElementById('password');
        const passwordPopup = document.getElementById('passwordPopup');
    
        usernameInput.addEventListener('focus', () => {
            usernamePopup.style.display = 'block';
        });
    
        usernameInput.addEventListener('blur', () => {
            usernamePopup.style.display = 'none';
        });
    
        passwordInput.addEventListener('focus', () => {
            passwordPopup.style.display = 'block';
        });
    
        passwordInput.addEventListener('blur', () => {
            passwordPopup.style.display = 'none';
        });
    });
    
    

    userForm.addEventListener('submit', event => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            message.textContent = 'Passwords do not match!';
            return;
        }

        fetch(`http://localhost:8083/api/username_available/${username}`)
            .then(response => response.text())
            .then(isAvailable => {
                if (isAvailable === 'NO') {
                    message.textContent = 'Username is already taken!';
                    return;
                }

                const newUser = {
                    name,
                    username,
                    password,
                };

                fetch('http://localhost:8083/api/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newUser),
                })
                .then(response => {
                    if (response.status === 403) {
                        message.textContent = 'Failed to register user!';
                        return;
                    }
                    message.textContent = 'User registered successfully!';
                    userForm.reset();
                })
                .catch(error => {
                    console.error('Error:', error);
                    message.textContent = 'Failed to register user!';
                });
            });
    });
});

