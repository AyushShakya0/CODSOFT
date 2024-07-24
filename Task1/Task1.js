document.addEventListener('DOMContentLoaded', function () {
    const taskList = document.getElementById('task-list');
    const newTaskInput = document.getElementById('new-task');
    const addTaskBtn = document.getElementById('add-task-btn');

    // Load tasks from local storage
    loadTasks();

    addTaskBtn.addEventListener('click', addTask);

    function addTask() {
        const taskText = newTaskInput.value.trim();
        if (taskText === '') {
            alert('Please enter a task');
            return;
        }

        const taskItem = createTaskElement(taskText);
        taskList.appendChild(taskItem);

        saveTask(taskText);

        newTaskInput.value = '';
    }

    function createTaskElement(taskText) {
        const li = document.createElement('li');

        const taskTextSpan = document.createElement('span');
        taskTextSpan.textContent = taskText;
        taskTextSpan.className = 'task-text';

        const btnContainer = document.createElement('div');
        btnContainer.className = 'btn-container';

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="material-icons" style="font-size:20px">delete</i>';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', function () {
            if (confirm('Are you sure you want to delete this task?')) {
                taskList.removeChild(li);
                deleteTask(taskText);
            }
        });

        const editBtn = document.createElement('button');
        editBtn.innerHTML = '<i class="material-icons" style="font-size:20px">edit</i>';
        editBtn.className = 'edit-btn';
        editBtn.addEventListener('click', function () {
            const newTaskText = prompt('Edit task:', taskText);
            if (newTaskText && newTaskText.trim() !== '') {
                taskTextSpan.textContent = newTaskText;
                updateTask(taskText, newTaskText);
            }
        });

        btnContainer.appendChild(editBtn);
        btnContainer.appendChild(deleteBtn);

        li.appendChild(taskTextSpan);
        li.appendChild(btnContainer);
        return li;
    }

    function saveTask(taskText) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(function (taskText) {
            const taskItem = createTaskElement(taskText);
            taskList.appendChild(taskItem);
        });
    }

    function deleteTask(taskText) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(function (task) {
            return task !== taskText;
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function updateTask(oldTaskText, newTaskText) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.map(function (task) {
            return task === oldTaskText ? newTaskText : task;
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
