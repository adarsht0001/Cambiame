const { adminLogin, users} = require('../controllers/admin');

const router = require('express').Router()

router.post('/login',adminLogin)

router.get('/users',users)

module.exports = router;