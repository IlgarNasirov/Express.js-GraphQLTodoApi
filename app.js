const express = require('express');
require('dotenv').config();
const graphqlHttp = require('express-graphql').graphqlHTTP;

const graphqlSchema = require('./graphql/schema')
const graphqlResolver = require('./graphql/resolvers');

const errorController = require('./controllers/error');

const app = express();

app.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (request.method === 'OPTIONS') {
        return response.sendStatus(200);
    }
    next();
});

app.use('/graphql', graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
    customFormatErrorFn(error) {
        if (!error.originalError) {
            return error;
        }
        const data = error.originalError.data;
        const message = error.message || 'Some errors occured.';
        const code = error.originalError.code || 500;
        return { message: message, status: code, data: data }
    }
}));

app.use(errorController.get500);

app.use(errorController.get404);

app.listen(process.env.PORT || 8000);