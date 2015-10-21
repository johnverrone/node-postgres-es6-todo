var express = require('express');
var router = express.Router();
var todo = require('./models/todo');


router.get('/api/todos', todo.getAll);
router.post('/api/todos', todo.createNew);
router.put('/api/todos/:todo_id', todo.update);
router.delete('/api/todos/:todo_id', todo.delete);

module.exports = router;