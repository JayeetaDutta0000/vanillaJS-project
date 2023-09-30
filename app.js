//selectors
const todoInput=document.querySelector(".todo-input");
const todoButton=document.querySelector(".todo-button");
const todoList=document.querySelector(".todo-list");
const filterOption=document.querySelector(".filter-todo");

//event listeners
document.addEventListener("DOMContentLoaded",getTodos);
todoButton.addEventListener("click",addTodo);
todoList.addEventListener("click",deleteCheck);
filterOption.addEventListener("click",filterTodo);

//functions
function addTodo(event){
  event.preventDefault(); //prevents form from submitting
  //creating Todo div using JS elements
  const todoDiv=document.createElement("div");
  todoDiv.classList.add("todo");//adding class name to the div for CSS
  //creating lists
  const newTodo=document.createElement("li");
  newTodo.innerText=todoInput.value;//passing the input field text in lists
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);//placing the li in the div. Here, div is parent and li is child
  // adding todos to local storage
  saveLocalTodos(todoInput.value);
  //create check button
  const completedButton=document.createElement("button");
  completedButton.innerHTML='<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  //create delete button
  const trashButton=document.createElement("button");
  trashButton.innerHTML='<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  //append todo list to todo div
  todoList.appendChild(todoDiv);
  //clear todo input value after entering into lists
  todoInput.value="";
}

function deleteCheck(e){
  const item = e.target; // to target the event of the specific item list
  //delete todo items
  if(item.classList[0]==="trash-btn")
  {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend",function(){
      todo.remove();
    })
  }
  //check mark
  if(item.classList[0]==="complete-btn")
  {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

//filters in todos check list
function filterTodo(e){
  const todos = todoList.childNodes;
  todos.forEach(function(todo){
    switch(e.target.value){
      case "all":
        todo.style.display = "flex";
        break;
        case "completed":
          if(todo.classList.contains("completed")){
            todo.style.display = "flex";
          }
          else{
            todo.style.display = "none";
          }
          break;
          case "uncompleted":
            if(!todo.classList.contains("completed")){
              todo.style.display = "flex";
            }
            else{
              todo.style.display = "none";
            }
            break;
    }
  });
}

//LOCAL STORAGE
function saveLocalTodos(todo){
  //checking if i already have data stored in my local storage
  let todos;
  if(localStorage.getItem("todos") === null)// if i have null in there
  {
     todos = []; //return an empty array
  }
  else{
    todos = JSON.parse(localStorage.getItem("todos"));// if i have items stored then retun those as array
  }
  // now if we have an array, then a new item would be added to that array list 
  // and set it back to the loacl storage
  todos.push(todo); 
  localStorage.setItem("todos", JSON.stringify(todos));
}

//to reflect my items in UI
function getTodos(){
  //checking if i already have data stored in my local storage
  let todos;
  if(localStorage.getItem("todos") === null)// if i have null in there
  {
     todos = []; //return an empty array
  }
  else{
    todos = JSON.parse(localStorage.getItem("todos"));// if i have items stored then retun those as array
  }
  todos.forEach(function(todo) {
    //creating Todo div using JS elements
  const todoDiv=document.createElement("div");
  todoDiv.classList.add("todo");//adding class name to the div for CSS
  //creating lists
  const newTodo=document.createElement("li");
  newTodo.innerText = todo;//passing the input field text in lists
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);//placing the li in the div. Here, div is parent and li is child
  //create check button
  const completedButton=document.createElement("button");
  completedButton.innerHTML='<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  //create delete button
  const trashButton=document.createElement("button");
  trashButton.innerHTML='<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  //append todo list to todo div
  todoList.appendChild(todoDiv);
  });
}
// to actually delete items in local storage when we are deleting it from our UI
function removeLocalTodos(todo){
  //checking if i already have data stored in my local storage
  let todos;
  if(localStorage.getItem("todos") === null)// if i have null in there
  {
     todos = []; //return an empty array
  }
  else{
    todos = JSON.parse(localStorage.getItem("todos"));// if i have items stored then retun those as array
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);// getting each item from div todo and deleting them from array
  localStorage.setItem("todos", JSON.stringify(todos));
}
