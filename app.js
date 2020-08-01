const express = require('express');
const app = express();

app.use(express.json());

//limit amount of calls to an end-point
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, //15 min
    max: 10 //limit each IP to 8 rew pe windowsMs
});

app.use(limiter);

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 8 // limit each IP to 8 requests per windowMs
});

app.use('/login', authLimiter);
app.use('/signup', authLimiter);

//set up knex and create the connection
const {Model} = require('objection');
const Knex = require('knex');
const knexfile = require('./knexfile.js')

const knex = Knex(knexfile.development);

//set up objection with the db knex connection
Model.knex(knex);

// setup routes
const authRoute = require('./routes/auth.js');
const usersRoute = require('./routes/users.js')

app.use(authRoute);
app.use(usersRoute);

app.post("/signup", (req, res) => {
   return res.send({response: req.body});
});

const PORT = 3000;

app.listen(PORT, (error) => {
    if(error) {
        console.log(error);
    }
    console.log("Server is running on the port", PORT);
})