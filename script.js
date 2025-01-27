// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', initializeApp);

// Function to initialize the application
function initializeApp() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

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

        // Create a new list item (li) for the task
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        // Create a "Remove" button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        // Add an event listener to the "Remove" button
        removeButton.addEventListener('click', () => {
            taskList.removeChild(taskItem);
        });

        // Append the "Remove" button to the list item
        taskItem.appendChild(removeButton);

        // Append the list item to the task list
        taskList.appendChild(taskItem);

        // Clear the input field
        taskInput.value = '';
    }
}
