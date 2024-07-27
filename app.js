const form = document.querySelector("#task-form");
const input = document.querySelector("#task");
const list = document.querySelector(".collection");
const clearBtn = document.querySelector("#clear-task");
const searchBar = document.querySelector(".search-bar");

loadEventListeners();

function loadEventListeners() {
    document.addEventListener("DOMContentLoaded", getTasks);
    form.addEventListener("submit", display);
    clearBtn.addEventListener("click", deleteList);
    list.addEventListener("click", deleteTask);
    searchBar.addEventListener("keyup", searchTasks);
}

function getTasks() {
    let tasks;

    if(localStorage.getItem("tasks") === null) {
        tasks = [];
    } 
    else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function(task){
        const li = document.createElement("li");
        
        li.className = "collection-item";

        li.appendChild(document.createTextNode(task));

        const link = document.createElement("a");

        link.className = "secondary-content";

        link.href = "#";

        link.innerHTML = `<i class="fa-solid fa-delete-left delete-task"></i>`;
        li.appendChild(link);

        list.appendChild(li);
    });
}

function display(event) {

    event.preventDefault();

    let tasks;

    if(localStorage.getItem("tasks") === null) {
        tasks = [];
    } 
    else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    if(input.value === ""){
        alert("Please enter the task!");
        console.log(tasks);
    }
    else{

        // const li = document.createElement("li");
        // li.setAttribute("class", "collection-item");
        // li.innerHTML = `${input.value} <a href="#" class="secondary-content"><i class="material-icons red-text delete-task">clear</i></a>`;

        // list.appendChild(li);
        // console.log(list);

        const li = document.createElement("li");
        
        li.className = "collection-item";

        li.appendChild(document.createTextNode(input.value));

        const link = document.createElement("a");

        link.className = "secondary-content";

        link.href = "#";

        link.innerHTML = `<i class="fa-solid fa-delete-left delete-task"></i>`;
        li.appendChild(link);

        list.appendChild(li);
            
        storeTaskInLocalStorage(input.value);
    }
}

function storeTaskInLocalStorage(task) {
    let tasks;

    if(localStorage.getItem("tasks") === null) {
        tasks = [];
    } 
    else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}



function deleteTask(event) {
    const target = event.target;

    if(target.classList.contains("delete-task")) {
        if(confirm("Are you sure")) {
            const listItem = event.target.closest('li');
            listItem.remove();
            removeTaskFromLocalStorage(listItem);
        }
    } else{
        return;
    }
}


function removeTaskFromLocalStorage(taskElement) {
    let tasks;

    if(localStorage.getItem("tasks") === null) {
        tasks = [];
    } 
    else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function(task, index){
        if(taskElement.innerText === task) {
            tasks.splice(index, 1);
        }

        localStorage.setItem("tasks", JSON.stringify(tasks));
    });
}

function deleteList(event) {
    list.innerHTML = `<li class="collection-header"><h4>Task List</h4></li>`;
    
    clearTaskFromLocalStorage();
}

function clearTaskFromLocalStorage() {
    localStorage.removeItem("tasks");
}

function searchTasks() {
    const searchText = searchBar.value.toLowerCase();
    const allTasks = document.querySelectorAll(".collection-item");

    allTasks.forEach(function(task) {
        const itemText = task.textContent.toLowerCase();
        if (itemText.indexOf(searchText) !== -1) {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    });
}