const { adminLogin, users,block} = require('../controllers/admin');

const router = require('express').Router()

router.post('/login',adminLogin)

router.get('/users',users)

router.put('/block',block)

module.exports = router;