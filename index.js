const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')
const mongoose = require('mongoose')
const http = require('http');
const graphqlServer = require('./graphql');

const app = express()

const config = require('./config')
const Router = require('./routers')

//Connect DB
mongoose.connect(config.MONGO_URI, {
    user: config.MONGO_USER,
    pass: config.MONGO_PASS
})

//Secure Express Apps
app.use(helmet())

//CORS Options
const corsOptions = {
    origin: true,
    credentials: true
};
  
app.use(cors(corsOptions));

//Parse the body request to json
app.use(bodyParser.json());

//HTTP request logger with Morgan
app.use(morgan('dev'));

// mongoose debugging
mongoose.set('debug', false);
app.use(morgan('dev'));

// Implement gqlserver
graphqlServer.applyMiddleware({ app });

const httpServer = http.createServer(app)

// Implement gql subscription
graphqlServer.installSubscriptionHandlers(httpServer)

//Default fallback
app.use(( error , req, res, next) => {
	return res.status(422).send({ status: {
        code: 422,
        message: error.message,
        succeeded: false
    }});
});

//Listen server to the specific PORT
httpServer.listen(config.PORT, () => {
  console.log(`listen port ${config.PORT}`)
})