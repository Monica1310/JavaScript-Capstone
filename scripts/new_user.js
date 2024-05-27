document.addEventListener("DOMContentLoaded", function () {
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll(".navbar a");
  
    navLinks.forEach(link => {
      if (link.href.includes(currentLocation)) {
        link.classList.add("active");
      }
    });
  });
  document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('userForm');
    const message = document.getElementById('message');
    
    document.addEventListener('DOMContentLoaded', function () {
        // Trigger modal when terms link is clicked
        document.getElementById('termsLink').addEventListener('click', function (e) {
            e.preventDefault();
            var modal = new bootstrap.Modal(document.getElementById('termsModal'));
            modal.show();
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
