document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('closeModal');

    loadTasks();

    addTaskButton.addEventListener('click', addTask);
    closeModal.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            modal.style.display = 'flex';
            return;
        }

        const task = { id: Date.now(), text: taskText };
        const tasks = getTasks();
        tasks.push(task);
        saveTasks(tasks);
        renderTask(task);

        taskInput.value = '';
    }

    function editTask(task) {
        const newTaskText = prompt('Edite a tarefa:', task.text);
        if (newTaskText !== null && newTaskText.trim() !== '') {
            task.text = newTaskText.trim();
            saveTasks(getTasks());
            renderTasks();
        }
    }

    function deleteTask(taskId) {
        const tasks = getTasks().filter(task => task.id !== taskId);
        saveTasks(tasks);
        renderTasks();
    }

    function getTasks() {
        return JSON.parse(localStorage.getItem('tasks')) || [];
    }

    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        renderTasks();
    }

    function renderTasks() {
        taskList.innerHTML = '';
        const tasks = getTasks();
        tasks.forEach(task => renderTask(task));
    }

    function renderTask(task) {
        const listItem = document.createElement('li');

        const span = document.createElement('span');
        span.textContent = task.text;

        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.classList.add('edit');
        editButton.addEventListener('click', () => editTask(task));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click', () => deleteTask(task.id));

        listItem.appendChild(span);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);

        taskList.appendChild(listItem);
    }
});
