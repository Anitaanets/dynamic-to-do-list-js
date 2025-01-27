// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', initializeApp);

// Function to initialize the application
function initializeApp() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage when the application starts
    loadTasks();

    // Attach event listeners
    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Function to add a new task
    function addTask() {
        // Retrieve and trim the task input value
        const taskText = taskInput.value.trim();

        // Check if the task text is empty
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Add the task to the task list in the DOM
        appendTaskToList(taskText);

        // Save the task to local storage
        saveTaskToLocalStorage(taskText);

        // Clear the input field
        taskInput.value = '';
    }

    // Function to load tasks from local storage
    function loadTasks() {
        // Clear the task list initially
        taskList.innerHTML = '';

        // Get tasks from local storage
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        // Append each task to the list
        tasks.forEach((taskText) => {
            appendTaskToList(taskText);
        });
    }

    // Function to append a task to the task list in the DOM
    function appendTaskToList(taskText) {
        // Create a new list item (li) for the task
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        // Add a class to the task item for styling
        taskItem.classList.add('task-item');

        // Create a "Remove" button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn'); // Add a class for styling

        // Add an event listener to the "Remove" button
        removeButton.addEventListener('click', () => {
            taskList.removeChild(taskItem);
            removeTaskFromLocalStorage(taskText);
        });

        // Append the "Remove" button to the list item
        taskItem.appendChild(removeButton);

        // Append the list item to the task list
        taskList.appendChild(taskItem);
    }

    // Function to save a task to local storage
    function saveTaskToLocalStorage(taskText) {
        // Get existing tasks from local storage
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        // Add the new task to the list
        tasks.push(taskText);

        // Save the updated list back to local storage
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to remove a task from local storage
    function removeTaskFromLocalStorage(taskText) {
        // Get existing tasks from local storage
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        // Filter out the task to be removed
        const updatedTasks = tasks.filter((task) => task !== taskText);

        // Save the updated list back to local storage
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
}
