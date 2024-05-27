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
    const ctx = document.getElementById('userChart').getContext('2d');
    const userReport = document.getElementById('userReport');
    let userChart;

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

    userSelect.addEventListener('change', () => {
        const userId = userSelect.value;
        fetch(`http://localhost:8083/api/todos/byuser/${userId}`)
            .then(response => response.json())
            .then(todos => {
                const labels = todos.map(todo => todo.description);
                const priorities = todos.map(todo => todo.priority === 'High' ? 3 : (todo.priority === 'Medium' ? 2 : 1));
                const completed = todos.map(todo => todo.completed ? 1 : 0);

                if (userChart) {
                    userChart.destroy();
                }

                userChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Priority (1-Low, 2-Medium, 3-High)',
                                data: priorities,
                                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                                borderColor: 'rgba(255, 99, 132, 1)',
                                borderWidth: 1
                            },
                            {
                                label: 'Completed (1-Yes, 0-No)',
                                data: completed,
                                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                                borderColor: 'rgba(54, 162, 235, 1)',
                                borderWidth: 1
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    stepSize: 1
                                }
                            }
                        },
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        let label = context.dataset.label || '';
                                        if (label) {
                                            label += ': ';
                                        }
                                        if (context.parsed.y !== null) {
                                            label += context.parsed.y;
                                        }
                                        return label;
                                    }
                                }
                            },
                            legend: {
                                display: true,
                                position: 'top',
                                labels: {
                                    font: {
                                        size: 14
                                    }
                                }
                            }
                        }
                    }
                });

                // Generate the brief report summary
                const totalTasks = todos.length;
                const completedTasks = todos.filter(todo => todo.completed).length;
                const highPriorityTasks = todos.filter(todo => todo.priority === 'High').length;

                userReport.innerHTML = `
                    <p>Total Tasks: ${totalTasks}</p>
                    <p>Completed: ${completedTasks}</p>
                    <p>High Priority: ${highPriorityTasks}</p>
                `;
            });
    });
});
