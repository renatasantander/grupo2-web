// import koa from 'koa';
// import KoaLogger from 'koa-logger';
// import { koaBody } from 'koa-body';
// import router from './routes.js';
// import orm from './models';

const Koa = require('koa');
const KoaLogger = require('koa-logger');
const { koaBody } = require('koa-body');
const cors = require('@koa/cors');
const router = require('./routes.js');
const orm = require('./models');

// Crear instancia de Koa
const app = new Koa();

app.context.orm = orm;

// cors para poder acceder desde el frontend
app.use(cors());

// Middlewares de Koa
app.use(KoaLogger());
app.use(koaBody());

// koa-router
app.use(router.routes());

// Middleware personalizado
app.use((ctx) => {
  ctx.body = 'Hello Koa';
});

// app.listen(3000, () => {
//   console.log('Server is running at http://localhost:3000');
// });

// export default app;
module.exports = app;
