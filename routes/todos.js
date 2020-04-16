const { Router } = require('express')
const { Todos, Notes } = require('../db')


const route = Router()

route.get('/', async (req, res) => {
  const todos = await Todos.findAll()       // listing all todos
  res.send(todos)
})

route.get('/sort/:id', async (req, res) => {
  
  if(req.params.id==='1')
    { //res.send({data:req.params.id})
      const todos = await Todos.findAll({
        order: [['due','ASC']],
    })
    res.send(todos)       // listing all todos
    }
  if(req.params.id==='2')
    { 
      const todos = await Todos.findAll({
        order: [['due','DESC']],
    })    
    res.send(todos)   // listing all todos
    }
  if(req.params.id==='3')
    { 
      const todos = await Todos.findAll({
        order: [['priority','ASC']],
    }) 
    res.send(todos)      // listing all todos
    }
  if(req.params.id==='4')
    { 
      const todos = await Todos.findAll({
        order: [['priority','DESC']],
    })
    res.send(todos)       // listing all todos
    }
  if(req.params.id==='5')
    { 
      const todos = await Todos.findAll({
        order: [['done','ASC']],
    })   
    res.send(todos)    // listing all todos
    }        
    
})

route.get('/:id', async (req, res) => {
  
  
  
  if (isNaN(Number(req.params.id))) {
    return res.status(400).send({
      error: 'todo id must be an integer',  //listing todo with given id
    })
  }
  
  const todo = await Todos.findByPk(req.params.id)

  if (!todo) {
    return res.status(404).send({
      error: 'No todo found with id = ' + req.params.id,
    })
  }
  res.send(todo)
})

route.get('/:id/notes', async (req, res) => {
    if (isNaN(Number(req.params.id))) {
      return res.status(400).send({
        error: 'todo id must be an integer',
      })
    }
    
    const notes = await Notes.findAll( {where: { taskId: req.params.id  }}) //listing all notes of a particular todo id
  
    if (!notes) {
      return res.status(404).send({
        error: 'No todo found with id = ' + req.params.id,
      })
    }
    res.send(notes)
  })

route.post('/', async (req, res) => {
  //console.log(req.body.task)
  if (typeof req.body.task !== 'string') {
    return res.status(400).send({ error: 'Task name not provided' })
  }
  
  
  const newTodo = await Todos.create({
      taskName: req.body.task,
      taskDescription: req.body.taskDescription,
      due: req.body.due,
      priority: req.body.priority
  })

  res.status(201).send({ success: 'New task added', data: newTodo })
})

route.post('/:id/notes', async (req, res) => {
    if (typeof req.body.note !== 'string') {
      return res.status(400).send({ error: 'Note name not provided' })
    }
    
    const newNote = await Notes.create({                          //adding notes to a todo
        taskId: req.body.id,
        noteDescription: req.body.note,
    })
  
    res.status(201).send({ success: 'New task added', data: newNote })
    console.log(req.body.id)
  })

route.patch('/:id', async (req, res) => {
    //console.log("Hello")
    
    if(!req.body.done && !req.body.newDueDate && !req.body.newPriority){
      return res.status(400).send({ error:'kuch gadbad g' })
    }
    if(req.body.done){
      Todos.update(
        {done: 1},
        { where: { taskId: req.params.id  },
          returning:true,
        }
      )
      .then(function(rowsUpdated) {
        res.status(201).send({data:rowsUpdated})
      })
    }
    if(req.body.newDueDate && !req.body.newPriority){
      Todos.update(
        {due: req.body.newDueDate},
        { where: { taskId: req.params.id  },
          returning:true,
        }
      )
      .then(function(rowsUpdated) {
        res.status(201).send({data:rowsUpdated})
      })
    }
    if(!req.body.newDueDate && req.body.newPriority){
      Todos.update(
        {priority: req.body.newPriority},
        { where: { taskId: req.params.id  },
          returning:true,
        }
      )
      .then(function(rowsUpdated) {
        res.status(201).send({data:rowsUpdated})
      })
    }
    if(req.body.newDueDate && req.body.newPriority){
      Todos.update(
        {due: req.body.newDueDate,
         priority:req.body.newPriority
        },
        { where: { taskId: req.params.id  },
          returning:true,
        }
      )
      .then(function(rowsUpdated) {
        res.status(201).send({data:rowsUpdated})
      })
    }    
    
})
  

module.exports = route
