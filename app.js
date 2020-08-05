const express = require('express');
const app = express();

const server = require('http').createServer(app);

const io = require('socket.io')(server);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static('public'));

const session = require('express-session');

const config = require('./config/config.json');

app.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true,

}));

// //limit amount of calls to an end-point
// const rateLimit = require('express-rate-limit');

// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000, //15 min
//     max: 10 //limit each IP to 8 rew pe windowsMs
// });

// app.use(limiter);

// const authLimiter = rateLimit({
//     windowMs: 15 * 60 * 1000, //15 minutes
//     max: 8 // limit each IP to 8 requests per windowMs
// });

// app.use('/login', authLimiter);
// app.use('/signup', authLimiter);

//set up knex and create the connection
const {Model} = require('objection');
const Knex = require('knex');
const knexfile = require('./knexfile.js')

const knex = Knex(knexfile.development);

//set up objection with the db knex connection
Model.knex(knex);

io.on('connection', socket => {
    // console.log("Socket joined", socket.id);

    // socket.on('disconnect', () => {
    //     console.log("Socket left", socket.id);
    // });
    socket.on('Send message', data => {
        io.emit("New message", data);
    })
})

const authRoute = require('./routes/auth.js');
const usersRoute = require('./routes/users.js');
const dashboardRoute = require('./routes/expenses.js');
const { nextTick } = require('process');

app.use(authRoute);
app.use(usersRoute);
app.use(dashboardRoute)

const fs = require('fs');
const chatPage = fs.readFileSync('./public/chat.html', 'utf8');

app.get('/', (req,res)=> {
    return res.redirect('/login');
})

app.get('/chat', (req, res) => {
    return res.send(chatPage);
})
const PORT = 3000;

server.listen(PORT, (error) => {
    if(error) {
        console.log(error);
    }
    console.log("Server is running on the port", PORT);
})