document.addEventListener('DOMContentLoaded', () => {
    // Load tasks from local storage
    loadTasks();

    // Event listener for adding a new task
    document.getElementById('new-task').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
});

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        // Create a new task element
        const newTask = document.createElement('li');
        newTask.innerHTML = `
            <span class="task-text">${taskText}</span>
            <div class="task-actions">
                <button onclick="toggleStatus(this)">Toggle Status</button>
                <button onclick="togglePriority(this)">Toggle Priority</button>
                <button onclick="editTask(this)">Edit</button>
                <button onclick="deleteTask(this)">Delete</button>
            </div>
        `;

        // Add the new task to the task list
        document.getElementById('task-list').appendChild(newTask);

        // Save tasks to local storage
        saveTasks();

        // Clear the input field
        taskInput.value = '';
    }
}

function toggleStatus(button) {
    const task = button.parentNode.parentNode;
    task.classList.toggle('completed');

    // Save tasks to local storage
    saveTasks();
}

function togglePriority(button) {
    const task = button.parentNode.parentNode;
    task.classList.toggle('high-priority');

    // Save tasks to local storage
    saveTasks();
}

function editTask(button) {
    const task = button.parentNode.parentNode;
    const taskTextElement = task.querySelector('.task-text');
    const newTaskText = prompt('Edit task:', taskTextElement.innerText);

    if (newTaskText !== null) {
        taskTextElement.innerText = newTaskText;

        // Save tasks to local storage
        saveTasks();
    }
}

function deleteTask(button) {
    const task = button.parentNode.parentNode;
    task.parentNode.removeChild(task);

    // Save tasks to local storage
    saveTasks();
}

function saveTasks() {
    const tasks = Array.from(document.getElementById('task-list').children).map(task => {
        return {
            text: task.querySelector('.task-text').innerText,
            completed: task.classList.contains('completed'),
            highPriority: task.classList.contains('high-priority')
        };
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('task-list');

    savedTasks.forEach(task => {
        const newTask = document.createElement('li');
        newTask.innerHTML = `
            <span class="task-text">${task.text}</span>
            <div class="task-actions">
                <button onclick="toggleStatus(this)">Toggle Status</button>
                <button onclick="togglePriority(this)">Toggle Priority</button>
                <button onclick="editTask(this)">Edit</button>
                <button onclick="deleteTask(this)">Delete</button>
            </div>
        `;

        // Set completed status if applicable
        if (task.completed) {
            newTask.classList.add('completed');
        }

        // Set high priority if applicable
        if (task.highPriority) {
            newTask.classList.add('high-priority');
        }

        taskList.appendChild(newTask);
    });

    // Add event listeners for "Toggle Status" buttons
    const toggleStatusButtons = document.querySelectorAll('.task-actions button:nth-child(1)');

    toggleStatusButtons.forEach(button => {
        button.addEventListener('click', function () {
            toggleStatus(this);
        });
    });
}
