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
    const userSelect = document.getElementById('userSelect');
    fetch('http://localhost:8083/api/users')
        .then(response => response.json())
        .then(users => {
            console.log(`${users}`);
            users.forEach(user => {
                const option = document.createElement('option');
                console.log(`${user.id} ${user.name}`);
                option.value = user.id;
                option.textContent = user.name;
                userSelect.appendChild(option);
            });
        });
    });
    userSelect.addEventListener('change', () => {
        const userId = userSelect.value;
        const userTodosTableBody = document.getElementById('userTodosBody');
        fetch(`http://localhost:8083/api/todos/byuser/${userId}`)
            .then(response => response.json())
            .then(todos => {
                userTodosTableBody.innerHTML = '';
                todos.forEach(todo => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${todo.id}</td>
                        <td>${todo.description}</td>
                        <td>${todo.deadline}</td>
                        <td>${todo.priority}</td>
                        <td>${todo.completed ? '✓' : 'X'}</td>
                    `;
                    userTodosTableBody.appendChild(row);
                });
            });
    });
