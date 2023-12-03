const Router = require('koa-router');

const router = new Router();

// Crear relación usuario-proyecto
router.post('usuario-proyecto.create', '/', async (ctx) => {
  try {
    const { rol, usuarioId, proyectoId } = ctx.request.body;

    const usuario = await ctx.orm.Usuario.findByPk(usuarioId);
    const proyecto = await ctx.orm.Proyecto.findByPk(proyectoId);

    if (!usuario || !proyecto) {
      ctx.status = 404;
      ctx.body = { error: 'Usuario o proyecto no encontrado' };
      return;
    }

    // Verificar que el usuario no esté ya en el proyecto
    const usuarioProyectoExistente = await ctx.orm.Usuario_Proyecto.findOne({
      where: { usuarioId, proyectoId },
    });
    if (usuarioProyectoExistente) {
      ctx.status = 400;
      ctx.body = { error: 'El usuario ya está en el proyecto' };
      return;
    }

    const usuarioProyecto = await ctx.orm.Usuario_Proyecto.create({
      rol,
      usuarioId,
      proyectoId,
    });

    ctx.status = 201;
    ctx.body = usuarioProyecto;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: 'Error al crear relación usuario-proyecto' };
  }
});

// Obtener todas las relaciones usuario-proyecto
router.get('usuario-proyecto.list', '/', async (ctx) => {
  try {
    const usuarioProyectos = await ctx.orm.Usuario_Proyecto.findAll();
    ctx.body = usuarioProyectos;
    ctx.status = 200;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error al obtener relaciones usuario-proyecto' };
  }
});

// Obtener relación usuario-proyecto por usuarioId y proyectoId
router.get(
  'usuario-proyecto.show',
  '/usuarios/:usuarioId/proyectos/:proyectoId',
  async (ctx) => {
    try {
      const { usuarioId, proyectoId } = ctx.params;
      const usuarioProyecto = await ctx.orm.Usuario_Proyecto.findOne({
        where: { usuarioId, proyectoId },
      });

      if (!usuarioProyecto) {
        ctx.status = 404;
        ctx.body = { error: 'Relación usuario-proyecto no encontrada' };
        return;
      }
      ctx.status = 200;
      ctx.body = usuarioProyecto;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: 'Error al obtener relación usuario-proyecto' };
    }
  },
);

// Obtener todos los proyectos de un usuario
router.get(
  'usuario-proyecto.getProjectsByUser',
  '/usuarios/:usuarioId/proyectos',
  async (ctx) => {
    try {
      const usuario = await ctx.orm.Usuario.findByPk(ctx.params.usuarioId);
      if (!usuario) {
        ctx.status = 404;
        ctx.body = { error: 'Usuario no encontrado' };
        return;
      }
      const proyectos = await usuario.getProyectos();
      ctx.status = 200;
      ctx.body = proyectos;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: 'Error al obtener proyectos del usuario' };
    }
  },
);

// Actualizar relación usuario-proyecto
router.patch(
  'usuario-proyecto.update',
  '/usuarios/:usuarioId/proyectos/:proyectoId',
  async (ctx) => {
    try {
      const { usuarioId, proyectoId } = ctx.params;
      const usuarioProyecto = await ctx.orm.Usuario_Proyecto.findOne({
        where: { usuarioId, proyectoId },
      });
      if (!usuarioProyecto) {
        ctx.status = 404;
        ctx.body = { error: 'Relación usuario-proyecto no encontrada' };
        return;
      }
      await usuarioProyecto.update(ctx.request.body);
      ctx.status = 200;
      ctx.body = usuarioProyecto;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: 'Error al actualizar relación usuario-proyecto' };
    }
  },
);

// Eliminar relación usuario-proyecto
router.delete(
  'usuario-proyecto.delete',
  '/usuarios/:usuarioId/proyectos/:proyectoId',
  async (ctx) => {
    try {
      const { usuarioId, proyectoId } = ctx.params;
      const usuarioProyecto = await ctx.orm.Usuario_Proyecto.findOne({
        where: { usuarioId, proyectoId },
      });
      if (!usuarioProyecto) {
        ctx.status = 404;
        ctx.body = { error: 'Relación usuario-proyecto no encontrada' };
        return;
      }
      await usuarioProyecto.destroy();
      ctx.status = 200;
      ctx.body = usuarioProyecto;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: 'Error al eliminar relación usuario-proyecto' };
    }
  },
);

module.exports = router;
