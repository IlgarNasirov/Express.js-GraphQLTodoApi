const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Todo{
    id: ID!
    text: String!
}

type TodoData{
    todos: [Todo!]!
    count: Int!
}

input TodoInputData {
    id: ID!
    text: String!
}

type RootQuery{
   todos:TodoData!
   todo(id: ID!):Todo!
}

type RootMutation {
    createTodo(text: String!):String!
    updateTodo(todoInput: TodoInputData!):String!
    deleteTodo(id: ID!): String!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);