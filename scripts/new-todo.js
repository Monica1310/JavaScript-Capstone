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
    const categorySelect = document.getElementById('categorySelect');
    

    // Fetch users
    fetch('http://localhost:8083/api/users')
        .then(response => response.json())
        .then(users => {
            users.forEach(user => {
                const option = document.createElement('option');
                option.value = user.id;
                option.textContent = user.name;
                userSelect.appendChild(option);
            });
        });
    });

    // Fetch categories
    fetch('http://localhost:8083/api/categories')
        .then(response => response.json())
        .then(categories => {
            console.log(`${JSON.stringify(categories)}`);
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id
                option.textContent = category.name;
                categorySelect.appendChild(option);
            });
        });
       
     /*   // Handle form submission
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newTodo = {
            userId: userIdSelect.value,
            category: categorySelect.value,
            description: document.getElementById('description').value,
            deadline: document.getElementById('deadline').value,
            priority: document.getElementById('priority').value
        };
*/
    // Form submission
    const newTodoForm = document.getElementById('newTodoForm');
    console.log(`${newTodoForm}`);

    newTodoForm.addEventListener('click', (event) => {
        event.preventDefault();
        const newTodo = {
            userid: userSelect.value,
            category: document.getElementById('categorySelect').value,
            description: document.getElementById('description').value,
            deadline: document.getElementById('deadline').value,
            priority: document.getElementById('prioritySelect').value,
    
        };
        console.log(`${newTodo}`);
        fetch('http://localhost:8083/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTodo)
        })
        .then(response => response.json())
        .then(data => {
            alert('ToDo added successfully!');
            newTodoForm.reset();
        })
        .catch(error => console.log('Error:', error));
    });