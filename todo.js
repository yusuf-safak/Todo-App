//selecting all elements
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButtton = document.querySelector("#clear-todos");

eventListeners();
//all event listeners
function eventListeners(){ 
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodoToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButtton.addEventListener("click",clearAllTodos);
}
//clears all todos
function clearAllTodos(e){ 
    if(confirm("Are you sure you want to delete all?"));
    while(todoList.firstElementChild != null){
        todoList.removeChild(todoList.firstElementChild);
    }
    localStorage.removeItem("todos");
}
//search filter for todos
function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");
    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue) == -1){
            listItem.setAttribute("style","display : none !important");
        }
        else{
            listItem.setAttribute("style","display : block");
        }
    })
}
//deletes only the clicked todo
function deleteTodo(e){
    if(e.target.className == "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage( e.target.parentElement.parentElement.textContent);
        showAlert("success","Todo has been deleted successfully.");
    }
}
//deletes only the clicked todo from local storage
function deleteTodoFromStorage(deletetodo){
    let todos = getTodoToStorage();
    todos.forEach(function(todo,index){
        if(todo == deletetodo){
            todos.splice(index,1);
        }
    })
    localStorage.setItem("todos",JSON.stringify(todos));
}
//loads todos to the UI
function loadAllTodoToUI(){
    let todos = getTodoToStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo)
    })
}
//adds the todo received from the user
function addTodo(e){
    const newTodo = todoInput.value.trim();
    if(newTodo == ""){
        showAlert("danger","Please enter a todo.");
    }
    else{
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success","Todo has been successfully added.")
    }
    newTodo = "";
    e.preventDefault();
}
//gets todos from local storage
function getTodoToStorage(){
    let todos;
    if(localStorage.getItem("todos") == null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}
//adds new todo to the local storage
function addTodoToStorage(newTodo){
    let todos = getTodoToStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
}
//shows alerts on UI
function showAlert(type,message){
    const alert = document.createElement("div");
    alert.className="alert alert-"+type;
    alert.textContent = message;
    firstCardBody.appendChild(alert); 
    setTimeout(function(){
        alert.remove();
    },1000);
}
//adds new todo to the UI
function addTodoToUI(newTodo){
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.href="#";
    link.className="delete-item";
    link.innerHTML = '<i class = "fa fa-remove"></i>';
    listItem.className = "list-group-item d-flex justify-content-between";

    //add Text Node
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    todoList.appendChild(listItem);
}
