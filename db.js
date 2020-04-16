const Sequelize = require('sequelize')

const db = new Sequelize({
    dialect: 'sqlite',
    storage: __dirname + '/todos.db'
})

const Todos = db.define('todos', {
    taskId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    taskName: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    taskDescription: {
        type: Sequelize.STRING,
        allowNull: false
    },
    done: {
        type: Sequelize.NUMBER(1),
        allowNull: false,
        defaultValue: 0
    },
    due: {
        type: Sequelize.DATEONLY
    },
    priority: {
        type: Sequelize.NUMBER(1),
        allowNull: false
    }
})

const Notes = db.define('notes', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    taskId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'todos',
            key: 'taskId'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade',
    },
    noteDescription: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
})


module.exports = {
    db, Todos, Notes
}

