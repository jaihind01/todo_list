let tasks = [];
var comptask = 0;
const taskList = document.getElementById("list");
const addTaskInput = document.getElementById("add");
const tasksCounter = document.getElementById("tasks-counter");
var compcount = document.getElementById("c-count");
const completeall = document.getElementById("complete-all");
const clearall = document.getElementById("clear-all");

console.log("Working");

function showNotification(text) {
  alert(text);
}

function addTaskToDOM(task) {
  const li = document.createElement("li");
  li.innerHTML = `    
            <input type="checkbox" id="${task.id}" ${
    task.done ? "checked" : ""
  } class="custom-checkbox">
            <label for="${task.id}">${task.text}</label>
            <img src="bin.png" class="delete" data-id="${task.id}" />  
    `;
  taskList.append(li);
}

function renderList() {
  taskList.innerHTML='';
  for (let i = 0; i < tasks.length; i++) {
    addTaskToDOM(tasks[i]);
  }
  c.innerHTML = tasks.length;
}

//checkbox toggle (check and uncheck)
function toggleTask(taskId) {
  const task = tasks.filter(function (task) {
    return task.id == taskId;
  });
  if (task.length > 0) {
    const currentTask = task[0];
    if (currentTask.done) {
      currentTask.done = false;
      comptask--;
    } else {
      currentTask.done = true;
      comptask++;
    }
    renderList();
    compcount.innerHTML = comptask;
    showNotification("Task marked successfully");
  } else {
    showNotification("Could not toggle the task");
  }
}

//click of button delete the task
function deleteTask(taskId) {
  const newTasks = tasks.filter(function (task) {
    return task.id !== taskId;
  });
  tasks = newTasks;
  renderList();
  showNotification("Task deleted successfully");
}

//single task added in the array of the tasks.
function addTask(task) {
  if (task) {
    tasks.push(task);
    renderList();
    showNotification("Task added successfully");
    return;
  }
  showNotification("task can not be added");
}

//click of enter button on the keyboard or a add button on screen the task is add
function handleInputKeypress(e) {
  if(e.key == 'Enter' || e.type == 'mousedown'){
    const text = addTaskInput.value;
    if(!text){
        showNotification('Task text cannot be empty') ; 
        return;
    }
    const task = {
        text,
        id:Date.now().toString(),
        done:false
    }
    addTaskInput.value = ''; 
    addTask(task);
}
}
  

function handleClickListener(e) {
  const target = e.target;
  console.log(target);

  if (target.className === "delete") {
    const taskId = target.dataset.id;
    deleteTask(taskId);
    return;
  } else if (target.className === "custom-checkbox") {
    const taskId = target.id;
    toggleTask(taskId);
    return;
  }
}

//on the click all tasks are completed
function allComplete() {
  for (let i = 0; i < tasks.length; i++) {
    tasks[i].done = true;
  }
  renderList();
  showNotification("All tasks marked as complete");

  compcount.innerHTML = tasks.length;
}

//click of button all task which is completed are cleared 
function allclear() {
  const checkboxes = document.querySelectorAll(".custom-checkbox");
  checkboxes.forEach(function (checkbox) {
    checkbox.checked = false;
  });
  tasks.forEach(function (task) {
    task.done = false;
  });
  renderList();
  showNotification("All tasks cleared successfully");
  compcount.innerHTML = 0;
}

//click of button completed task only show
function complete() {
  const tasks = document.querySelectorAll("#list li");
  tasks.forEach((task) => {
    const checkbox = task.querySelector(".custom-checkbox");
    if (checkbox.checked) {
      task.style.display = "flex";
      console.log("jaihind ");
    } else {
      task.style.display = "none";
    }
  });
}
//click fo button uncompleted task show only
function uncomplete() {
  const tasks = document.querySelectorAll("#list li");
  tasks.forEach((task) => {
    const checkbox = task.querySelector(".custom-checkbox");
    if (checkbox.checked) {
      task.style.display = "none";
    } else {
      task.style.display = "flex";
    }
  });
}

function initializeApp() {
  addTaskInput.addEventListener("keyup", handleInputKeypress);
  btn.addEventListener('mousedown', handleInputKeypress); 
  document.addEventListener("click", handleClickListener);
  comp.addEventListener("click", complete);
  uncomp.addEventListener("click", uncomplete);
  all.addEventListener("click", renderList);
  completeall.addEventListener("click", allComplete);
  clearall.addEventListener("click", allclear);
}

initializeApp();
