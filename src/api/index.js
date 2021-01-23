const express = require('express');
const user = require('../model/user');
const router = express.Router();
const User = require('../model/user');
router.get('/test', (req, res) => {
    res.send('server works properly !!!');
});

router.post('/register_user', (req, res) => {
    User.findOne({
        name: req.body.name,
        phone_number: req.body.phone_number,
        city: req.body.city
    }).then((data) => {
        if(data) {
            const resData = {
                status: 201,
                msg: "User already registered !"
            };
            res.send(resData);
        } else {
            let newUser = new User({
                name: req.body.name,
                phone_number: req.body.phone_number,
                city: req.body.city
            });
            newUser.save()
                .then((data) => {
                    const resData = {
                        status: 200,
                        msg: "register success !"
                    }
                    res.send(resData);
                })
                .catch(err => {
                    console.error(err);
                    res.send(err);
                });
        }
    })
});

router.post('/remove_user', (req, res) => {
    User.deleteOne({name: req.body.name, phone_number: req.body.phone_number, city: req.body.city})
        .then((data) => {
            res.send(data);
        })
        .catch(err => {
            console.error(err);
            res.status(500);
        });
});

router.get('/get_users', (req, res) => {
    User.find()
        .then((data) => {
            res.send(data);
        })
        .catch(err => {
            console.error(err);
            res.send(err);
        });
});

router.post('/update_user', (req, res) => {
    User.updateOne({_id: req.body.id}, {name: req.body.name, phone_number: req.body.phone_number, city: req.body.city})
        .then((data) => {
            console.log(data);
            res.send({
                status: 200,
                msg: 'Update success !',
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500);
        })
})

module.exports = router;
