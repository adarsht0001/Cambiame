const router = require('express').Router();
const { signup, login } = require('../controllers/user');

router.post('/signup', signup);

router.post('/login', login);

module.exports = router;
