const users = require('../models/users');
let id = 0;

module.exports = {
    login: (req, res, next) => {
        const user = users.find(user => user.username === req.body.username && user.password === req.body.password);

        if (user) {
            req.session.user.username = req.body.username;
            res.status(200).send(req.session.user)
        } else {
            res.status(500).send('User not found.');
        }

    },

    register: (req, res, next) => {
        const { username, password } = req.body;
        users.push({username, password, id});
        id++;
        req.session.user.username = username;
        res.status(200).send(req.session.user);

    },

    signout: (req, res, next) => {
        req.session.destroy();
        res.status(200).send(req.session);
    },

    getUser: (req, res, next) => {
        res.status(200).send(req.session.user);
    }
}