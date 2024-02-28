require("dotenv").config();
const express = require('express')
const cors = require("cors");
// const path = require("path");
const mongoose = require("mongoose");
// const compression = require("compression");
// const session = require("express-session");
// const cookieParser = require("cookie-parser");
const { DB_URL } = process.env;
const app = express();

//Database Connections Starts
mongoose.connect(DB_URL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    autoIndex: true
    // createIndexes:true
});
let db = mongoose.connection;
db.once("open", () => console.log("Connected to MongoDB"));
db.on("disconnected", () => console.log("Disonnected to MongoDB"));
db.on("reconnected", () => console.log("Reconnected to MongoDB"));
db.on("error", err => console.log(err));
//Database Connections Ends

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(compression());
// app.use(cookieParser());
// app.use(session({
//     name : 'demo-mern-stack-app',
//     secret : 'demo-mern-stack-app-secret-key',
//     resave : true,
//     saveUninitialized: true,
//     cookie : { maxAge:(1000 * 60 * 100) }      
// }));

//STATIC ROUTES
// app.use(express.static(path.join(__dirname, "public")));
// app.use("/public", express.static(path.join(__dirname, "public")));

app.use('/api/todos', require('./src/routes'));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => res.status(error.status || 500).json({ error: { message: error.message } }));
  
module.exports = app;