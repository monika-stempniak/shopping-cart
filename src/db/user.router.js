const express = require('express');
const User = require('./user.model');
const router = express.Router();

router.use(express.json());

// http://localhost:4000/user/new
router.post('/new', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

// http://localhost:4000/user/login
router.post('/login', async (req, res, next) => {
    try {
        const userLogin = req.body.login;
        User.findOne({ login: userLogin }, async function (err, user) {
            if (err) {
                return next(new Error(err));
            }
        
            if (!user) {
                return next(new Error('Invalid login'));
            }

            res.send({ id: user._id, token: "XYZ"});
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
