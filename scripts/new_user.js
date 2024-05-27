document.addEventListener("DOMContentLoaded", function () {
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll(".navbar a");
  
    navLinks.forEach(link => {
      if (link.href.includes(currentLocation)) {
        link.classList.add("active");
      }
    });
  });

  /*
  document.addEventListener('DOMContentLoaded', () => {
    const message = document.getElementById('message');
    
    document.addEventListener('DOMContentLoaded', function () {
        // Trigger modal when terms link is clicked
        document.getElementById('termsLink').addEventListener('click', function (e) {
            e.preventDefault();
            var modal = new bootstrap.Modal(document.getElementById('termsModal'));
            modal.show();
        });
    });
  });
  */

    const userForm = document.getElementById('userForm');
    console.log(`${userForm}`);
    userForm.addEventListener('click', event => {
        const message = document.getElementById('message');
        event.preventDefault();
        const name = document.getElementById('FullName').value;
        const username = document.getElementById('UserName').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('ConfirmPassword').value;

        console.log(name, username, password, confirmPassword);
        
        if (password !== confirmPassword) {
            message.textContent = 'Passwords do not match!';
            return;
        }
                fetch(`http://localhost:8083/api/username_available/${username}`)
                .then(response => response.text())
                .then(isAvailable => {
                    if (isAvailable === false) {
                        message.textContent = 'Username is already taken!';
                        return;
                    }

        
        
                const newUser = {
                    "name":name,
                    "username":username,
                    "password":password
                };

                console.log(JSON.stringify(newUser));
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
