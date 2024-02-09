const express = require('express');
const mongoose = require('mongoose');
const routes = require("express").Router();
const newsRoutes = require("../src/routes/newsRoutes");

const app = express();
app.use(routes);
app.use(express.json());

let port = 3000;

routes.use("/user", newsRoutes);

// Connection to the DB
try {
  mongoose.connect("mongodb://localhost:27017/newsusersdb", {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  console.log("Connection to db is successfull.");
} catch (err) {
  console.log("Error while connecting to the DB.");
}

app.listen(port, (err) => {
  if(!err) {
    console.log('Server started on port 3000.');
  } else {
    console.log('Some error encountered.');
  }
}); 