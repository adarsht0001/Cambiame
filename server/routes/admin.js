const router = require('express').Router();
const { adminLogin, users, block } = require('../controllers/admin');

router.post('/login', adminLogin);

router.get('/users', users);

router.put('/block', block);

module.exports = router;
