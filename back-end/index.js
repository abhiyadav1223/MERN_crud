require('./db');
const mongoose = require('mongoose');
const express = require("express");
const app = express();
const userData = require('./userinfo');
const cors = require('cors')
app.use(express.json());
app.use(cors())

app.get('/dashboard', async (req, resp) => {
    try {
        let data = await userData.find();
        resp.status(200).send(data);
    } catch (er) {
        resp.status(404).send("Not Found");
    }
})
app.get('/lastid', async (req, resp) => {
    try {
        let data = await userData.find().sort({_id:-1}).limit(1);
        resp.status(200).send(data);
    } catch (er) {
        resp.status(404).send("Not Found");
    }
})

app.get('/search/:key', async (req, resp) => {
    try {
        let key = req.params.key;
        let data = await userData.find({
            "$or": [
                { "name": { $regex: key } },
                { "email": { $regex: key } },
                { "city": { $regex: key } },

            ]
        });
        resp.status(200).send(data);
    } catch (er) {
        resp.status(404).send("Not Found");
    }
})

app.post('/insertnewuser', async (req, resp) => {
    try {
        let body = req.body;
        // console.log(body);
        let data = await userData(body);
        let insertData = await data.save()
        resp.status(200).send("data inserted successfully");
    } catch (er) {
        resp.status(404).send("Not Found");
    }
})

app.put('/updateuser/:_id', async (req, resp) => {
    try {
        let result = await userData.updateOne(
            req.params,
            { $set: req.body }
        )
        resp.status(200).send("data updated successfully");
    } catch (er) {
        resp.status(404).send("Not Found");
    }
})
app.delete('/removeuser/:_id', async (req, resp) => {
    try {
        let result = await userData.deleteOne(req.params)
        resp.status(200).send("data deleted successfully");
    } catch (er) {
        resp.status(404).send("Not Found");
    }
})

app.listen(9800, () => {
    console.log("connected");
});