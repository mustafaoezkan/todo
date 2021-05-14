// Select all elements
const form           = document.querySelector("#todo-form");
const todoInput      = document.querySelector("#todo");
const todoList       = document.querySelector(".list-group");
const firstCardBody  = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter         = document.querySelector("#filter");
const clearButton    = document.querySelector("#clear-todos");

eventListeners();

function eventListeners() {  // All eventListeners
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
}

function clearAllTodos(e) {
    if(confirm("Are you sure you want to delete all?")) {
        // Remove todos from UI
        while(todoList.firstElementChild != null) {
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
    }
    
}

function filterTodos(e) {
    const filterValue = e.target.value.toLowerCase();
    const listItems   = document.querySelectorAll(".list-group-item");
    
    listItems.forEach(function(listItem) {
        const text = listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue) === -1) {
            // Not Find
            listItem.setAttribute("style","display : none !important");
        }
        else {
            // Find
            listItem.setAttribute("style","display : block");
        }
    });
}

function deleteTodoFromStorage(deletedTodo) {
    let todos = getTodosFromStorage();
    todos.forEach(function(todo,index) {
        if (todo === deletedTodo) {
            todos.splice(index,1);  
        }
    });

    localStorage.setItem("todos",JSON.stringify(todos));
}

function loadAllTodosToUI() {
    let todos = getTodosFromStorage();

    todos.forEach(function(todo) {
        addTodoToUI(todo);
    });
}

function deleteTodo(e) {
    if (e.target.className === "fa fa-remove") {
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","Todo successfully deleted..");
    }
}

function addTodo(e) {
    const newTodo = todoInput.value.trim();  
    if(newTodo === "") {
        showAlert("danger","Please enter a todo!!!");
    }
    else {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success","Todo successfully added..");
    }

    e.preventDefault();
}

function getTodosFromStorage() {  // Get all todos from storage
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addTodoToStorage(newTodo) {
    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos",JSON.stringify(todos));
}

function showAlert(type,message) {
    const alert = document.createElement("div");

    alert.className   = `alert alert-${type}`;
    alert.textContent = message;

    firstCardBody.appendChild(alert);

    //setTimeout

    setTimeout(function() {
        alert.remove();
    },1500);
}
function addTodoToUI(newTodo) { // Add string value as list item to UI
    // create list item
     const listItem = document.createElement("li");
     // create link
     const link           = document.createElement("a");
           link.href      = "#";
           link.className = "delete-item";
           link.innerHTML = "<i class = 'fa fa-remove'></i>";
     // Classify a list item
     listItem.className = "list-group-item d-flex justify-content-between";

     // Add Text Node
     listItem.appendChild(document.createTextNode(newTodo));
     // Add link
     listItem.appendChild(link);

     // Add list item to todolist
     todoList.appendChild(listItem); 
     todoInput.value = "";

}