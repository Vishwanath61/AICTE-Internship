document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() !== '') {
        const task = {
            text: taskInput.value,
            completed: false
        };

        // Save the task to local storage
        saveTask(task);

        // Add the task to the UI
        appendTask(task, taskList);

        // Clear the input field
        taskInput.value = '';
    }
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const taskList = document.getElementById('taskList');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => {
        appendTask(task, taskList);
    });
}

function appendTask(task, taskList) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span class="${task.completed ? 'complete' : ''}">${task.text}</span>
        <span class="delete" onclick="deleteTask(this)">Delete</span>
    `;

    li.addEventListener('click', function () {
        task.completed = !task.completed;
        saveTasksToLocalStorage();
        this.querySelector('span').classList.toggle('complete');
    });

    taskList.appendChild(li);
}

function deleteTask(element) {
    const taskList = document.getElementById('taskList');
    const taskText = element.parentElement.querySelector('span').innerText;

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.text !== taskText);

    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskList.removeChild(element.parentElement);
}

function saveTasksToLocalStorage() {
    const taskList = document.getElementById('taskList');
    const tasks = Array.from(taskList.children).map(li => {
        return {
            text: li.querySelector('span').innerText,
            completed: li.querySelector('span').classList.contains('complete')
        };
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}
