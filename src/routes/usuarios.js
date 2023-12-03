// import Router from "koa-router";

const Router = require('koa-router');
const bcrypt = require('bcrypt');
const authUtils = require('../lib/auth/jwt');

const router = new Router();

router.get('usuarios.list', '/', async (ctx) => {
  try {
    const usuarios = await ctx.orm.Usuario.findAll();
    ctx.body = usuarios;
    ctx.status = 200;
  } catch (error) {
    // ctx.body = error;
    ctx.body = { error: 'Error al obtener los usuarios' };
    ctx.status = 500;
  }
});

router.get('usuario.show', '/me', authUtils.verifyToken, async (ctx) => {
  try {
    const usuarioId = ctx.state.usuario.sub;
    const usuario = await ctx.orm.Usuario.findOne({ where: { id: usuarioId } });
    if (!usuario) {
      ctx.body = { error: 'Usuario no encontrado' };
      ctx.status = 404;
    }
    ctx.body = usuario;
    ctx.status = 200;
  } catch (error) {
    console.log('Error:', error);
    ctx.body = { error: 'Error al obtener el usuario' };
    ctx.status = 500;
  }
});

router.get('usuario.showByID', '/:id', async (ctx) => {
  try {
    const usuario = await ctx.orm.Usuario.findOne({ where: { id: ctx.params.id } });
    if (usuario) {
      ctx.body = usuario;
      ctx.status = 200;
    } else {
      ctx.body = { error: 'Usuario no encontrado' };
      ctx.status = 404;
    }
  } catch (error) {
    // ctx.body = error;
    ctx.body = { error: 'Error al obtener el usuario' };
    ctx.status = 500;
  }
});

router.get('usuario.showByEmail', '/mail/:mail', async (ctx) => {
  try {
    const usuario = await ctx.orm.Usuario.findOne({ where: { mail: ctx.params.mail } });
    if (usuario) {
      ctx.body = usuario;
      ctx.status = 200;
    } else {
      ctx.body = { error: 'Usuario no encontrado' };
      ctx.status = 404;
    }
  } catch (error) {
    ctx.body = { error: 'Error al obtener el usuario' };
    ctx.status = 500;
  }
});

router.patch('usuario.update', '/:id', async (ctx) => {
  try {
    const usuario = await ctx.orm.Usuario.findOne({ where: { id: ctx.params.id } });
    if (!usuario) {
      ctx.body = { error: 'Usuario no encontrado' };
      ctx.status = 404;
      return;
    }
    const updatedData = { ...ctx.request.body };

    if (updatedData.password) {
      const saltRounds = 10;
      const hashPassword = await bcrypt.hash(updatedData.password, saltRounds);
      updatedData.password = hashPassword;
    }

    await usuario.update(updatedData);
    ctx.body = usuario;
    ctx.status = 200;
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const errorMessages = error.errors.map((err) => err.message);
      ctx.body = { error: errorMessages };
      ctx.status = 400;
    } else if (error.name === 'SequelizeUniqueConstraintError') {
      const errorMessages = error.errors.map((err) => err.message);
      ctx.body = { error: errorMessages };
      ctx.status = 400;
    } else {
      ctx.throw(500, 'Error al actualizar el usuario');
    }
  }
});

router.delete('usuario.delete', '/:id', async (ctx) => {
  try {
    const usuario = await ctx.orm.Usuario.findOne({ where: { id: ctx.params.id } });
    if (usuario) {
      await usuario.destroy();
      ctx.body = usuario;
      ctx.status = 200;
    } else {
      ctx.body = { error: 'Usuario no encontrado' };
      ctx.status = 404;
    }
  } catch (error) {
    // ctx.body = error;
    ctx.body = { error: 'Error al eliminar el usuario' };
    ctx.status = 500;
  }
});

// export default router;
module.exports = router;
