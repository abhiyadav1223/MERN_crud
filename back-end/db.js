const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/employeeData")
    .then((msg) => {
        console.log("Connection to mDb successfull");
    })
    .catch((er) => {
        console.log("connnection failed");
    })