const express = require('express');
const router = express.router();
const formularioUsuario = require('../controllers/userController');

router.get('/', formularioUsuario);
router.get('/usuarios', formularioUsuario);
router.get('/clientes', formularioUsuario);

module.exports = router;

