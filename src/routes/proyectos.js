// import Router from "koa-router";

const Router = require('koa-router');

const router = new Router();

router.post('proyecto.create', '/', async (ctx) => {
  try {
    const proyecto = await ctx.orm.Proyecto.create(ctx.request.body);
    ctx.body = proyecto;
    ctx.status = 201;
  } catch (error) {
    // ctx.body = error;
    ctx.body = { error: 'Error al crear el proyecto' };
    ctx.status = 400;
  }
});

router.get('proyectos.list', '/', async (ctx) => {
  try {
    const proyectos = await ctx.orm.Proyecto.findAll();
    ctx.body = proyectos;
    ctx.status = 200;
  } catch (error) {
    // ctx.body = error;
    // ctx.status = 400;
    ctx.body = { error: 'Error al obtener los proyectos' };
    ctx.status = 500;
  }
});

router.get('proyecto.show', '/:id', async (ctx) => {
  try {
    const proyecto = await ctx.orm.Proyecto.findOne({ where: { id: ctx.params.id } });
    if (proyecto) {
      ctx.body = proyecto;
      ctx.status = 200;
    } else {
      ctx.body = { error: 'Proyecto no encontrado' };
      ctx.status = 404;
    }
  } catch (error) {
    ctx.body = { error: 'Error al obtener el proyecto' };
    ctx.status = 500;
  }
});

router.patch('proyecto.update', '/:id', async (ctx) => {
  try {
    const proyecto = await ctx.orm.Proyecto.findOne({ where: { id: ctx.params.id } });
    if (proyecto) {
      await proyecto.update(ctx.request.body);
      ctx.body = proyecto;
      ctx.status = 200;
    } else {
      ctx.body = { error: 'Proyecto no encontrado' };
      ctx.status = 404;
    }
  } catch (error) {
    // ctx.body = error;
    // ctx.status = 400;
    ctx.body = { error: 'Error al actualizar el proyecto' };
    ctx.status = 500;
  }
});

router.delete('proyecto.delete', '/:id', async (ctx) => {
  try {
    const proyecto = await ctx.orm.Proyecto.findOne({ where: { id: ctx.params.id } });
    if (proyecto) {
      await proyecto.destroy();
      ctx.body = proyecto;
      ctx.status = 200;
    } else {
      ctx.body = { error: 'Proyecto no encontrado' };
      ctx.status = 404;
    }
  } catch (error) {
    // ctx.body = error;
    // ctx.status = 400;
    ctx.body = { error: 'Error al eliminar el proyecto' };
    ctx.status = 500;
  }
});

// export default router;
module.exports = router;
