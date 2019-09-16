let tasks = [];

function save(tasks) {
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
}

const taskForm = document.getElementById("task-form");
const taskInputField = document.getElementById("task");
const taskList = document.getElementsByClassName("collection")[0];
const clearTasksButton = document.getElementsByClassName("clear-tasks")[0];
const filterInputField = document.getElementById("filter");
const saveTasksButton = document.getElementById("save");

onLoad();
function onLoad() {
    clearTasksButton.addEventListener("click", clearTasks);
    taskForm.addEventListener("submit", addTask);
    filterInputField.addEventListener("keyup", filterTasks);
    saveTasksButton.addEventListener("click", saveTasks)

    //window.localStorage.clear();
    let str = window.localStorage.getItem("tasks");
    if (str !== null) {
        tasks = JSON.parse(str);
        showTasks(filterInputField.value);
    }
}

function saveTasks(e) {
    save(tasks);
}

function filterTasks(e) {
    showTasks(filterInputField.value);
}

function clearTasks(e) {
    if (confirm("remove all tasks?")) {
        tasks = [];
        showTasks(filterInputField.value);
    }
}

function removeTask(e) {
    let id = parseInt(e.currentTarget.id);
    if (confirm(`remove '${tasks[id]}'?`)) {
        tasks.splice(id, 1);
        console.log("abc");
        showTasks(filterInputField.value);
        e.preventDefault();
    }
}

function addTask(e) {
    tasks.push(taskInputField.value);
    taskInputField.value = "";
    showTasks(filterInputField.value);
    e.preventDefault();
}

function showTasks(filter) {
    //let result = "";
    let i = 0;
    taskList.innerHTML = "";
    if (task.length === 0) return;
    tasks.forEach(function(task) {
        if (task.substr(0, filter.length).toLowerCase() == filter.toLowerCase()) {
            let elem = document.createElement("li");
            elem.appendChild(document.createTextNode(task));
            let rmBtn = document.createElement("a");
            rmBtn.innerHTML = "<i class='fa fa-remove'></i>";
            rmBtn.className = "delete-item secondary-content";
            rmBtn.id = i.toString();
            rmBtn.addEventListener("click", removeTask);
            elem.appendChild(rmBtn);

            taskList.appendChild(elem);
            i++;
        }
    });
    //taskList.innerHTML = result;
}