const validator = require('validator');

let todos = [];

module.exports = {
    createTodo: ({ text }) => {
        if (validator.isEmpty(text)) {
            const error = new Error("Text cannot be empty.");
            error.code = 422;
            throw error;
        }
        todos.push({
            id: new Date().toISOString(),
            text: text
        });
        return 'Todo successfully added!'
    },
    updateTodo: ({ todoInput }) => {
        const errors = [];
        if (validator.isEmpty(todoInput.id)) {
            errors.push("ID cannot be empty.");
        }
        if (validator.isEmpty(todoInput.text)) {
            errors.push("Text cannot be empty.");
        }
        if (errors.length > 0) {
            const error = new Error('Some errors occured.');
            error.data = errors;
            error.code = 422;
            throw error;
        }
        const todoIndex = todos.findIndex(todo => todo.id === todoInput.id);
        if (todoIndex < 0) {
            const error = new Error('Todo with this id is not found!');
            error.code = 401;
            throw error;
        }
        todos[todoIndex] = {
            id: todoInput.id,
            text: todoInput.text
        };
        return "Todo successfully updated!";
    },
    deleteTodo: ({ id }) => {
        if (validator.isEmpty(id)) {
            const error = new Error("ID cannot be empty.");
            error.code = 422;
            throw error;
        }
        const todoIndex = todos.findIndex(todo => todo.id === id);
        if (todoIndex < 0) {
            const error = new Error('Todo with this id is not found!');
            error.code = 401;
            throw error;
        }
        todos = todos.filter(todo => todo.id !== id);
        return "Todo successfully deleted!";
    },
    todos: () => {
        return {
            todos: todos,
            count: todos.length
        };
    },
    todo: ({ id }) => {
        if (validator.isEmpty(id)) {
            const error = new Error("ID cannot be empty.");
            error.code = 422;
            throw error;
        }
        const todoIndex = todos.findIndex(todo => todo.id === id);
        if (todoIndex < 0) {
            const error = new Error('Todo with this id is not found!');
            error.code = 401;
            throw error;
        }
        return todos[todoIndex];
    }
}