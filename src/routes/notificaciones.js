/* eslint-disable no-restricted-syntax, no-await-in-loop */

const Router = require('koa-router');

const router = new Router();

// Crear notificacion
router.post('notificacion.create', '/', async (ctx) => {
  try {
    const {
      tipo, mensaje, leido, proyecto, usuarioId,
    } = ctx.request.body;

    const usuario = await ctx.orm.Usuario.findByPk(usuarioId);

    if (!usuario) {
      ctx.status = 404;
      ctx.body = { error: 'Usuario no encontrado' };
      return;
    }

    const notificacion = await ctx.orm.Notificacion.create({
      tipo,
      mensaje,
      leido,
      proyecto,
      usuarioId,
    });

    ctx.status = 201;
    ctx.body = notificacion;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: 'Error al crear notificación' };
  }
});

// Obtener todas las notificaciones
router.get('notificacion.list', '/', async (ctx) => {
  try {
    const notificaciones = await ctx.orm.Notificacion.findAll();
    ctx.body = notificaciones;
    ctx.status = 200;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error al obtener notificaciones' };
  }
});

// Obtener notificacion por id
router.get('notificacion.show', '/:id', async (ctx) => {
  try {
    const notificacion = await ctx.orm.Notificacion.findByPk(ctx.params.id);
    if (!notificacion) {
      ctx.status = 404;
      ctx.body = { error: 'Notificacion no encontrada' };
      return;
    }
    ctx.status = 200;
    ctx.body = notificacion;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error al obtener notificacion' };
  }
});

// Actualizar notificacion por id
router.patch('notificacion.update', '/:id', async (ctx) => {
  try {
    const notificacion = await ctx.orm.Notificacion.findByPk(ctx.params.id);
    if (!notificacion) {
      ctx.status = 404;
      ctx.body = { error: 'Notificacion no encontrada' };
      return;
    }
    await notificacion.update(ctx.request.body);
    ctx.body = notificacion;
    ctx.status = 200;
  } catch (error) {
    ctx.body = { error: 'Error al actualizar notificacion' };
    ctx.status = 500;
  }
});

// Eliminar notificacion por id
router.delete('notificacion.delete', '/:id', async (ctx) => {
  try {
    const notificacion = await ctx.orm.Notificacion.findByPk(ctx.params.id);
    if (!notificacion) {
      ctx.status = 404;
      ctx.body = { error: 'Notificacion no encontrada' };
      return;
    }
    await notificacion.destroy();
    ctx.status = 200;
    ctx.body = notificacion;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error al eliminar notificacion' };
  }
});

// Obtener todas las notificaciones de un usuario
router.get(
  'notificacion.listByUsuario',
  '/usuarios/:usuarioId',
  async (ctx) => {
    try {
      const { usuarioId } = ctx.params;
      const usuario = await ctx.orm.Usuario.findByPk(ctx.params.usuarioId);
      if (!usuario) {
        ctx.status = 404;
        ctx.body = { error: 'Usuario no encontrado' };
        return;
      }
      const notificaciones = await ctx.orm.Notificacion.findAll({
        where: { usuarioId, leido: false },
      });
      ctx.status = 200;
      ctx.body = notificaciones;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: 'Error al obtener notificaciones del usuario' };
    }
  },
);

router.get('notificacion.reminder', '/reminder/:usuarioId', async (ctx) => {
  try {
    const { usuarioId } = ctx.params;
    const usuario = await ctx.orm.Usuario.findByPk(ctx.params.usuarioId);
    if (!usuario) {
      ctx.status = 404;
      ctx.body = { error: 'Usuario no encontrado' };
      return;
    }
    const tareas = await ctx.orm.Tarea.findAll({ where: { usuarioId } });
    let timeLeft;
    let notificacion;
    for (const i in tareas) {
      if (tareas[i].estado !== 'Terminada') {
        timeLeft = tareas[i].fecha - new Date();
        if (timeLeft > 0 && timeLeft < 3 * 24 * 60 * 60 * 1000) {
          // set for 3 days until due date
          notificacion = await ctx.orm.Notificacion.findAll({
            where: { usuarioId, tipo: 'Recordatorio', proyecto: tareas[i].id },
          });
          if (notificacion.length === 0) {
            await ctx.orm.Notificacion.create({
              tipo: 'Recordatorio',
              mensaje: `${tareas[i].fecha
                .toString()
                .substr(4, 11)} es la fecha limite de la tarea ${
                tareas[i].titulo
              }`,
              leido: false,
              proyecto: tareas[i].id,
              usuarioId,
            });
          }
        }
      }
    }
    ctx.status = 200;
    ctx.body = 'Notificaciones actualizadas';
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error al actualizar las notificaciones del usuario' };
  }
});

module.exports = router;

/* eslint-disable no-restricted-syntax, no-await-in-loop */
