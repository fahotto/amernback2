const express = require('express');
const router = express.router();
const formularioUsuario = require('../controllers/userController');

router.get('/', formularioUsuario);

module.exports = router;

