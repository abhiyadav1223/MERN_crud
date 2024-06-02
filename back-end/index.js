require('./db');
const port = 9800;
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
            jwt.sign({ data }, secretKey, { expiresIn: '10000s' }, (err, token) => {
                if (err) {
                    console.log(err);
                }
                else {
                    resp.status(200).json({ message: "LogIn Success", token, data });
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

function tokenVerify(req, resp, next) {
    let bearerHead = req.headers['authorization'];
    if (typeof bearerHead !== 'undefined') {
        const bearer = bearerHead.split(' ');
        const token = bearer[1];
        req.token = token;
        next();
    }
    else {
        resp.status(403).send("Forbidden , token expire");
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
app.get('/lastid', tokenVerify, async (req, resp) => {
    try {
        jwt.verify(req.token, secretKey, async (err, auth) => {
            if (err) {
                resp.send("invalid token")
            }
            else {
                let data = await userData.find().sort({ _id: -1 }).limit(1);
                resp.status(200).send(data);
            }
        })
    } catch (er) {
        resp.status(404).send("Not Found");
    }
})

app.get('/search/:key', tokenVerify, async (req, resp) => {
    try {
        jwt.verify(req.token, secretKey, async (err, auth) => {
            if (err) {
                resp.send("invalid token")
            }
            else {
                let key = req.params.key;
                let data = await userData.find({
                    "$or": [
                        { "name": { $regex: key } },
                        { "email": { $regex: key } },
                        { "city": { $regex: key } },

                    ]
                });
                resp.status(200).send(data);
            }
        })
    } catch (er) {
        resp.status(404).send("Not Found");
    }
})

app.post('/insertnewuser', tokenVerify, async (req, resp) => {
    try {
        jwt.verify(req.token, secretKey, async (err, auth) => {
            if (err) {
                resp.status(498).send("invalid token")
            }
            else {
                let body = req.body;
                let data = await userData(body);
                let insertData = await data.save()
                resp.status(200).send("data inserted successfully");
            }
        })
    } catch (er) {
        resp.status(404).send("Not Found");
    }
})

app.put('/updateuser/:_id', tokenVerify, async (req, resp) => {
    try {

        jwt.verify(req.token, secretKey, async (err, auth) => {
            if (err) {
                resp.send("invalid token")
            }
            else {
                let result = await userData.updateOne(
                    req.params,
                    { $set: req.body }
                )
                resp.status(200).send("data updated successfully");
            }
        })
    } catch (er) {
        resp.status(404).send("Not Found");
    }
})
app.delete('/removeuser/:_id', tokenVerify, async (req, resp) => {
    try {
        jwt.verify(req.token, secretKey, async (err, auth) => {
            if (err) {
                resp.send("invalid token")
            }
            else {
                let result = await userData.deleteOne(req.params)
                let returnData = await userData.find();
                resp.status(200).json({ msg: "data deleted successfully", returnData: returnData });
            }
        })
    } catch (er) {
        resp.status(404).send("Not Found");
    }
})

app.listen(port, () => {
    console.log("connected");
});