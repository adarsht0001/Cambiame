const { adminLogin } = require('../controllers/admin');

const router = require('express').Router()

router.post('/login',adminLogin)

module.exports = router;