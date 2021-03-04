module.exports = app => {
    const users = require('../controllers/user.controller');

    const router = require('express').Router();

    //Create new user
    router.post('/', users.create);


    app.use('/users', router);
}