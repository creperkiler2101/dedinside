let tasks = [];

const taskForm = document.getElementById("task-form");
const taskInputField = document.getElementById("task");
const taskList = document.getElementsByClassName("collection")[0];
const clearTasksButton = document.getElementsByClassName("clear-tasks")[0];
const filterInputField = document.getElementById("filter");

onLoad();
function onLoad() {
    clearTasksButton.addEventListener("click", clearTasks);
    taskForm.addEventListener("submit", addTask);
    //filterInputField.addEventListener("change", filterTasks);
    filterInputField.addEventListener("keyup", filterTasks);
}

function filterTasks(e) {
    showTasks(filterInputField.value);
}

function clearTasks(e) {
    tasks = [];
    showTasks("");
}

function addTask(e) {
    tasks.push(taskInputField.value);
    taskInputField.value = "";
    showTasks("");
    e.preventDefault();
}

function showTasks(filter) {
    let result = "";
    tasks.forEach(function(task) {
        if (task.substr(0, filter.length) == filter.toLowerCase()) {
            result += `<li>${task}</li>`;
        }
    });
    taskList.innerHTML = result;
}