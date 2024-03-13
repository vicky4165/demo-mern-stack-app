require("dotenv").config();
const express = require('express')
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const { DB_URL } = process.env;
const app = express();

//Database Connections Starts
mongoose.connect(DB_URL, { });
let db = mongoose.connection;
db.once("open", () => console.log("Connected to MongoDB"));
db.on("disconnected", () => console.log("Disonnected to MongoDB"));
db.on("reconnected", () => console.log("Reconnected to MongoDB"));
db.on("error", err => console.log(err));
//Database Connections Ends

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//STATIC ROUTES
app.use(express.static(path.join(__dirname, "public")));
app.use("/public", express.static(path.join(__dirname, "public")));

app.use('/api/todos', require('./src/routes/todo.routes'));
app.use('/api/media', require('./src/routes/media.routes'));

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
app.use((error, req, res, next) => res.status(error.status || 500).json({ status: false, msg: error.message, data: null }));
  
module.exports = app;