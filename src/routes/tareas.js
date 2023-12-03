const Router = require('koa-router');

const router = new Router();

// Crear tarea
router.post('tarea.create', '/', async (ctx) => {
  try {
    const {
      titulo, fecha, estado, comentario, usuarioId, proyectoId,
    } = ctx.request.body;

    const usuario = await ctx.orm.Usuario.findByPk(usuarioId);
    const proyecto = await ctx.orm.Proyecto.findByPk(proyectoId);

    if (!usuario || !proyecto) {
      ctx.status = 404;
      ctx.body = { error: 'Usuario o proyecto no encontrado' };
      return;
    }

    const tarea = await ctx.orm.Tarea.create({
      titulo,
      fecha,
      estado,
      comentario,
      usuarioId,
      proyectoId,
    });

    ctx.status = 201;
    ctx.body = tarea;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: 'Error al crear tarea' };
  }
});

// Obtener todas las tareas
router.get('tarea.list', '/', async (ctx) => {
  try {
    const tareas = await ctx.orm.Tarea.findAll();
    ctx.body = tareas;
    ctx.status = 200;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error al obtener tareas' };
  }
});

// Obtener tarea por id
router.get('tarea.show', '/:id', async (ctx) => {
  try {
    const tarea = await ctx.orm.Tarea.findByPk(ctx.params.id);
    if (!tarea) {
      ctx.status = 404;
      ctx.body = { error: 'Tarea no encontrada' };
      return;
    }
    ctx.status = 200;
    ctx.body = tarea;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error al obtener tarea' };
  }
});

// Actualizar tarea por id
router.patch('tarea.update', '/:id', async (ctx) => {
  try {
    const tarea = await ctx.orm.Tarea.findByPk(ctx.params.id);
    if (!tarea) {
      ctx.status = 404;
      ctx.body = { error: 'Tarea no encontrada' };
      return;
    }
    await tarea.update(ctx.request.body);
    ctx.status = 200;
    ctx.body = tarea;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error al actualizar tarea' };
  }
});

// Eliminar tarea por id
router.delete('tarea.delete', '/:id', async (ctx) => {
  try {
    const tarea = await ctx.orm.Tarea.findByPk(ctx.params.id);
    if (!tarea) {
      ctx.status = 404;
      ctx.body = { error: 'Tarea no encontrada' };
      return;
    }
    await tarea.destroy();
    ctx.status = 200;
    ctx.body = tarea;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error al eliminar tarea' };
  }
});

// Obtener todas las tareas de un proyecto
router.get('tarea.listByProyecto', '/proyectos/:proyectoId', async (ctx) => {
  try {
    const proyecto = await ctx.orm.Proyecto.findByPk(ctx.params.proyectoId);
    if (!proyecto) {
      ctx.status = 404;
      ctx.body = { error: 'Proyecto no encontrado' };
      return;
    }
    const tareas = await proyecto.getTareas();
    ctx.status = 200;
    ctx.body = tareas;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error al obtener tareas del proyecto' };
  }
});

// Obtener todas las tareas de un usuario
router.get('tarea.listByUsuario', '/usuarios/:usuarioId', async (ctx) => {
  try {
    const usuario = await ctx.orm.Usuario.findByPk(ctx.params.usuarioId);
    if (!usuario) {
      ctx.status = 404;
      ctx.body = { error: 'Usuario no encontrado' };
      return;
    }
    const tareas = await usuario.getTareas();
    ctx.status = 200;
    ctx.body = tareas;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error al obtener tareas del usuario' };
  }
});

module.exports = router;
