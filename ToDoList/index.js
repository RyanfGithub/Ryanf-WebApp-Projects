// Load tasks from localStorage when the document is fully loaded
document.addEventListener('DOMContentLoaded', loadTasks);

// Function to load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTaskToDOM(task.text, task.done);
    });
}

// Function to save tasks to localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#toDoList li').forEach(item => {
        tasks.push({
            text: item.querySelector('span').textContent,
            done: item.querySelector('label').textContent.includes('Done')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to add a task to the DOM
function addTaskToDOM(taskText, taskDone = false) {
    const toDoList = document.getElementById('toDoList');
    const toDoItem = document.createElement('li');

    const toDo = document.createElement('span');
    toDo.textContent = taskText;

    const doneLabel = document.createElement('label');
    doneLabel.style.marginLeft = '10px';
    if (taskDone) {
        doneLabel.textContent = ' <-- Done';
    }

    toDo.addEventListener('click', function() {
        doneLabel.textContent = ' <-- Done';
        saveTasks();  // Save tasks after marking as done
    });

    const button = document.createElement('button');
    button.textContent = 'X';
    button.style.marginLeft = '10px';
    button.classList.add('xButton');
    
    button.addEventListener('click', function() {
        toDoItem.remove();
        saveTasks();  // Save tasks after removing
    });

    toDoItem.appendChild(toDo);
    toDoItem.appendChild(button);
    toDoItem.appendChild(doneLabel);
    toDoList.appendChild(toDoItem);

    saveTasks();  // Save tasks after adding to the DOM
}

function add() {
    const taskInputInput = document.querySelector('input[name="taskinput"]');
    const newText = taskInputInput.value;

    if (newText === '') return;

    addTaskToDOM(newText);
    taskInputInput.value = '';
}

function clearAll() {
    console.log("Clear All button clicked"); // Debugging line
    const toDoList = document.getElementById('toDoList');
    toDoList.innerHTML = ''; // Clears all child elements of the to-do list
    saveTasks();  // Save tasks after clearing the list
}
