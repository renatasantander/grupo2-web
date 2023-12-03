const Router = require('koa-router');
const jwtMiddleware = require('koa-jwt');
const dotenv = require('dotenv');
const proyectos = require('./routes/proyectos.js');
const usuarios = require('./routes/usuarios.js');
const authRoutes = require('./routes/authentication.js');
const usuarioProyectos = require('./routes/usuarioProyectos.js');
const tareas = require('./routes/tareas.js');
const etiquetas = require('./routes/etiquetas.js');
const notificaciones = require('./routes/notificaciones.js');
const scopeProtectedRoutes = require('./routes/scopeExample.js');

dotenv.config();

const router = new Router();

router.use('/proyectos', proyectos.routes());
router.use(authRoutes.routes());
router.use('/usuario-proyectos', usuarioProyectos.routes());
router.use('/tareas', tareas.routes());
router.use('/etiquetas', etiquetas.routes());
router.use('/notificaciones', notificaciones.routes());

// Desde esta linea, todas las rutas requeriran un JWT. Esto no aplica para
// las lineas anteriores
router.use(jwtMiddleware({ secret: process.env.JWT_SECRET }));
router.use('/usuarios', usuarios.routes());

router.use('/scope-example', scopeProtectedRoutes.routes());

module.exports = router;
