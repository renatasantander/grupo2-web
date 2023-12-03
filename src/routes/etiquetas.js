const Router = require('koa-router');

const router = new Router();

// Crear etiqueta
router.post('etiqueta.create', '/', async (ctx) => {
  try {
    const { nombre, tareaId } = ctx.request.body;
    const tarea = await ctx.orm.Tarea.findByPk(tareaId);

    if (!tarea) {
      ctx.status = 404;
      ctx.body = { error: 'Tarea no encontrada' };
      return;
    }

    const etiqueta = await ctx.orm.Etiqueta.create({
      nombre,
      tareaId,
    });

    ctx.status = 201;
    ctx.body = etiqueta;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: 'Error al crear etiqueta' };
  }
});

// Obtener todas las etiquetas
router.get('etiqueta.list', '/', async (ctx) => {
  try {
    const etiquetas = await ctx.orm.Etiqueta.findAll();
    ctx.body = etiquetas;
    ctx.status = 200;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error al obtener etiquetas' };
  }
});

// Obtener etiqueta por id
router.get('etiqueta.show', '/:id', async (ctx) => {
  try {
    const etiqueta = await ctx.orm.Etiqueta.findByPk(ctx.params.id);
    if (!etiqueta) {
      ctx.status = 404;
      ctx.body = { error: 'Etiqueta no encontrada' };
      return;
    }
    ctx.status = 200;
    ctx.body = etiqueta;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error al obtener etiqueta' };
  }
});

// Actualizar etiqueta por id
router.patch('etiqueta.update', '/:id', async (ctx) => {
  try {
    const etiqueta = await ctx.orm.Etiqueta.findByPk(ctx.params.id);
    if (!etiqueta) {
      ctx.status = 404;
      ctx.body = { error: 'Etiqueta no encontrada' };
      return;
    }
    await etiqueta.update(ctx.request.body);
    ctx.status = 200;
    ctx.body = etiqueta;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error al actualizar etiqueta' };
  }
});

// Eliminar etiqueta por id
router.delete('etiqueta.delete', '/:id', async (ctx) => {
  try {
    const etiqueta = await ctx.orm.Etiqueta.findByPk(ctx.params.id);
    if (!etiqueta) {
      ctx.status = 404;
      ctx.body = { error: 'Etiqueta no encontrada' };
      return;
    }
    await etiqueta.destroy();
    ctx.status = 200;
    ctx.body = etiqueta;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error al eliminar etiqueta' };
  }
});

// Obtener todas las etiquetas de una tarea
router.get('etiqueta.listByTarea', '/tareas/:tareaId', async (ctx) => {
  try {
    const { tareaId } = ctx.params;
    const tarea = await ctx.orm.Tarea.findByPk(tareaId);
    if (!tarea) {
      ctx.status = 404;
      ctx.body = { error: 'Tarea no encontrada' };
      return;
    }
    const etiquetas = await ctx.orm.Etiqueta.findAll({ where: { tareaId } });
    ctx.status = 200;
    ctx.body = etiquetas;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error al obtener etiquetas de la tarea' };
  }
});

module.exports = router;
