window.addEventListener('load', loadTasks)
let i=0
let id=0
function loadTasks() {
  setToTomorrowsDate()
  let taskHolder = document.getElementById('taskHolder')
  taskHolder.innerHTML=""
  getTodos()
  .then((todos) => {
    todos.forEach(todo => {
      
      let task=document.createElement('li')
      task.classList = 'list-group-item'
      task.innerHTML = `
          <div id="accordion">
              <div class="card">
                <div class="card-header" id="heading${i}">
                  <h6 class="mb-0">
                    <div class="row">
                      <div class="col form-check">
                        <label data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
                          Task Name
                        </label>
                      </div>
                      <div class="col" >
                        <label>
                          Status
                        </label>
                      </div>
                      <div class="col">
                        <label>
                        Priority
                        </label>
                      </div>
                      <div class="col">
                        <label>
                        Due Date
                        </label>
                      </div>
                    </div>
                    <hr style="border:1px solid grey">
                    <div class="row">
                      <div class="col form-check">
                        <input class="form-check-input done" type="checkbox" value="${todo.taskId}" id="${todo.taskId}">
                        <label data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
                          `+ todo.taskName + `
                        </label>
                      </div>
                      <div class="col" >
                        <label>
                          ${todo.done?"Completed":"Incomplete"}
                        </label>
                      </div>
                      <div class="col">
                        <label>
                        ${todo.priority==1?"High":todo.priority==2?"Medium":"Low"}
                        </label>
                      </div>
                      <div class="col">
                        <label>
                        ${todo.due}
                        </label>
                      </div>
                    </div>  
                  </h6>
                </div>
                        
                <div id="collapse${i}" class="collapse show" aria-labelledby="heading${i}" data-parent="#accordion">
                  <div class="card-body">
                    <div class="form-row">
                      <div class="col">
                        <label >Due Date</label>
                        <input type="date" name="dueDate" class="form-control col-form-label" id="dueDate${todo.taskId}" value="">
                      </div>
                      <div class="col">
                        <label for="" >Priority</label><br>
                        <select class="form-control col-form-label custom-select " id="priority${todo.taskId}">
                          <option value="3">Low</option>
                          <option value="2">Medium</option>
                          <option value="1">High</option>
                        </select>
                      </div>
                      <div class="col">
                        <div class="row"><p>&nbsp;</p></div>
                        <button type="submit" class="btn btn-primary btn-sm" id="updateTask${todo.taskId}" onClick="updateTask(${todo.taskId})">Update Task</button>
                      </div>
                    </div>
                    <br>
                    <p>
                    `+ todo.taskDescription + `
                                  
                    </p>
                    <form class="form-inline">
                      <label for="taskName" class="col-form-label mr-sm-2">Add Note</label>
                      <input type="text" class="form-control mb-2 mr-sm-2" id="note${todo.taskId}">
                      <button type="submit" class="btn btn-primary mb-2" id="addNote${todo.taskId}" onClick="addNotes(${todo.taskId})">Add Note</button>
                    </form>
                    <div>
                      <h5>Notes-</h5>
                      <ul id="notesList${todo.taskId}">
                        
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>    
            
           `
      taskHolder.appendChild(task)
      i++     
      id=todo.taskId     
      generateNotes(id)       
    });
  })


  document.getElementById("addTask").onclick = function (resp, req) {

    task = document.getElementById("taskName").value
    taskDescription = document.getElementById("taskDescription").value
    dueDate = document.getElementById('dueDate').value
    const radios = document.getElementsByName('priority');
    for (const radio of radios) {
      if (radio.checked)
        priority = radio.value;
    }
    
    //document.getElementById("console").innerHTML=` ${task}+" "+${taskDescription}+" "+${dueDate}+" "+${priority}Incomplete" `
    addNewTodoUrlEncoded(task, taskDescription, dueDate, parseInt(priority))
  }
  document.getElementById('sortMenu').onchange = function(resp,req){
    
    sortMenu(parseInt(document.getElementById('sortMenu').value),taskHolder)
  }
  
  function setToTomorrowsDate(){
    var currentDate = new Date()
    currentDate.setDate(currentDate.getDate() + 1)
    document.getElementById('dueDate').value= currentDate.toISOString().substr(0,10);
    }
   
  
}
      

// SORT UTILITY
function sortMenu(id,taskHolder){
  taskHolder.innerHTML=""
  sortResult(id)
  .then((todos) => {
    todos.forEach(todo => {
      
      let task=document.createElement('li')
      task.classList = 'list-group-item'
      task.innerHTML = `
        <div id="accordion">
              <div class="card">
                <div class="card-header" id="heading${i}">
                  <h6 class="mb-0">
                    <div class="row">
                    <div class="col form-check">
                      <label data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
                        Task Name
                      </label>
                    </div>
                    <div class="col" >
                      <label>
                        Status
                      </label>
                    </div>
                    <div class="col">
                      <label>
                      Priority
                      </label>
                    </div>
                    <div class="col">
                      <label>
                      Due Date
                      </label>
                    </div>
                  </div>
                  <hr style="border:1px solid grey">
                    <div class="row">
                      <div class="col form-check">
                        <input class="form-check-input done" type="checkbox" value="${todo.taskId}" id="${todo.taskId}">
                        <label data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
                          `+ todo.taskName + `
                        </label>
                      </div>
                      <div class="col" >
                        <label>
                          ${todo.done?"Completed":"Incomplete"}
                        </label>
                      </div>
                      <div class="col">
                        <label>
                        ${todo.priority==1?"High":todo.priority==2?"Medium":"Low"}
                        </label>
                      </div>
                      <div class="col">
                        <label>
                        ${todo.due}
                        </label>
                      </div>
                    </div>  
                  </h6>
                </div>
                        
                <div id="collapse${i}" class="collapse show" aria-labelledby="heading${i}" data-parent="#accordion">
                  <div class="card-body">
                    <div class="form-row">
                      <div class="col">
                        <label >Due Date</label>
                        <input type="date" name="dueDate" class="form-control col-form-label" id="dueDate${todo.taskId}" value="">
                      </div>
                      <div class="col">
                        <label for="" >Priority</label><br>
                        <select class="form-control col-form-label custom-select " id="priority${todo.taskId}">
                          <option value="3">Low</option>
                          <option value="2">Medium</option>
                          <option value="1">High</option>
                        </select>
                      </div>
                      <div class="col">
                        <div class="row"><p>&nbsp;</p></div>
                        <button type="submit" class="btn btn-primary btn-sm" id="updateTask${todo.taskId}" onClick="updateTask(${todo.taskId})">Update Task</button>
                      </div>
                    </div>
                    <br>
                    <p>
                    `+ todo.taskDescription + `
                                  
                    </p>
                    <form class="form-inline">
                      <label for="taskName" class="col-form-label mr-sm-2">Add Note</label>
                      <input type="text" class="form-control mb-2 mr-sm-2" id="note${todo.taskId}">
                      <button type="submit" class="btn btn-primary mb-2" id="addNote${todo.taskId}" onClick="addNotes(${todo.taskId})">Add Note</button>
                    </form>
                    <div>
                      <h5>Notes-</h5>
                      <ul id="notesList${todo.taskId}">
                        
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>    
            
           `
      taskHolder.appendChild(task)
      i++     
      id=todo.taskId     
      generateNotes(id)       
    });
  })
  //console.log(parseInt(document.getElementById('sortMenu').value))
}


function generateNotes(id){
  let notesList = document.getElementById(`notesList${id}`)
  getNotes(id)
      .then((notes)=>{
        notes.forEach(note => {
          //console.log(todo)
          let ele = document.createElement('li')
          ele.textContent = note.noteDescription
          notesList.appendChild(ele)
          
        });
      })
}

async function sortResult(id) {
  const resp = await fetch(`/todos/sort/${id}`, { method: 'GET' })
  const todos = await resp.json()                                         // list all notes for a task (todo)
  //console.log(todos)
  return todos
}

function addNotes(id) {
  
  note = document.getElementById(`note${id}`).value
  //document.getElementById("console").innerHTML=`note`
  addNewNoteUrlEncoded(note,id)
}

function updateTask(id) {
  
  newDueDate = document.getElementById(`dueDate${id}`).value
  newPriority = document.getElementById(`priority${id}`).value
  //document.getElementById("console").innerHTML=`note`
  updateTaskUrlEncoded(id,newDueDate,newPriority)
}


function updateStatus() {
  var elements = document.getElementsByClassName("done");
  for (const ele of elements) {
    if(ele.checked==true){
      completeTaskUrlEncoded(ele.id)
      //console.log("hello")
    }
  }
  //
}

async function getTodos() {
  const resp = await fetch('/todos', { method: 'GET' })         //list all todos
  const todos = await resp.json()
  //console.log(todos)
  return todos
}

async function getNotes(taskId) {
  const resp = await fetch(`/todos/${taskId}/notes`, { method: 'GET' })
  const notes = await resp.json()                                         // list all notes for a task (todo)
  //console.log(todos)
  return notes
}

async function addNewTodoUrlEncoded(task, taskDescription, dueDate, priority, done) {
  const resp = await fetch('/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'       // add new todo -url
    },
    body: `task=${task}&taskDescription=${taskDescription}&due=${dueDate}&priority=${priority}`

  })
}

async function addNewTodoJson(task, done, due) {
  const resp = await fetch('/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'            // add new todo -Json
    },
    body: JSON.stringify({ task, taskDescription, dueDate, priority })
  })
}

async function addNewNoteUrlEncoded(note,id) {
  //document.getElementById("console").innerHTML=`${note}`
  const resp = await fetch(`/todos/:id/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'     // add new note -url
    },
    body: `note=${note}&id=${id}`

  })
}

async function addNewNoteJson(note,id) {
  const resp = await fetch(`/todos/${id}/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'          // add new note -Json
    },
    body: JSON.stringify({ note,id })
  })
}

async function completeTaskUrlEncoded(taskId) {
  id = parseInt(taskId)
  done = "completed"
  console.log("hello")
  const resp = await fetch(`/todos/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'     // add new note -url
    },
    body: `done=${done}`

  }).catch((err)=>alert(err)).finally(loadTasks())
  
}
async function updateTaskUrlEncoded(taskId,newDueDate,newPriority) {
  id = parseInt(taskId)
  const resp = await fetch(`/todos/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'     // add new note -url
    },
    body: `newDueDate=${newDueDate}&newPriority=${newPriority}`

  }).catch((err)=>alert(err)).finally(loadTasks())
  
}

