require('./db');
const mongoose = require('mongoose');
const express = require("express");
const app = express();
const userData = require('./userinfo');
const userAuth = require('./loginSignup');
const cors = require('cors')
const jwt = require('jsonwebtoken')
const secretKey = "secretkey1200";

app.use(express.json());
app.use(cors());



app.post('/signup', async (req, resp) => {
    try {
        let body = req.body;
        let data = await userAuth.find({ userId: body.userId });
        if (data.length == 0) {
            let addUser = await userAuth(body);
            let respUser = await addUser.save();
            resp.status(200).send("Sign Up Success");
        }
        else {
            resp.status(404).send("already exits");
        }

    } catch (er) {
        console.log(er);
    }
})

app.post('/login', async (req, resp) => {
    try {
        let body = req.body;
        let data = await userAuth.find(body);
        if (data.length != 0) {
            jwt.sign({ data }, secretKey, { expiresIn: '500s' }, (err, token) => {
                if (err) {
                    console.log(err);
                }
                else {
                    resp.status(200).json({ message: "LogIn Success", token });
                }
            })
        }
        else {
            resp.status(300).json({ message: "Invalid userid or password" });
        }
    } catch (er) {
        resp.status(500).json({ message: "server error" });
    }
})

app.post('/profile', tokenVerify, (req, resp) => {
    jwt.verify(req.token, secretKey, (err, auth) => {
        if (err) {
            resp.send("invalid token")
        }
        else {
            resp.json({
                msg: "profile verfied",
                auth
            })
        }
    })
})

function tokenVerify(req, resp, next) {
    let bearerHead = req.headers['authorization'];
    if (typeof bearerHead !== 'undefined') {
        const bearer = bearerHead.split(' ');
        const token = bearer[1];
        req.token = token;
        next();
    }
    else {
        resp.send({
            msg: "Token Expires..."
        })
    }
}

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
        let data = await userData.find().sort({ _id: -1 }).limit(1);
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