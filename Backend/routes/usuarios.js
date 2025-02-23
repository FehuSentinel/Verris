import express from 'express';
import usuariosController from '../controllers/usuarios.js';
import { verificarToken } from '../helpers/autenticacion.js';

const route = express.Router();

// Rutas de autenticación
route.post('/register', usuariosController.register);
route.post('/login', usuariosController.login);

// Obtener datos del usuario autenticado
route.get('/:id', verificarToken, usuariosController.getOne);

export default route;
