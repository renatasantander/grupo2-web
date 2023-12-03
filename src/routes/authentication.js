// import Router from "koa-router";

const Router = require('koa-router');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
// const authUtils = require('../lib/auth/jwt');

dotenv.config();

const router = new Router();

router.post('authentication.signup', '/signup', async (ctx) => {
  const authInfo = ctx.request.body;
  let user = await ctx.orm.Usuario.findOne({ where: { mail: authInfo.mail } });
  if (user) {
    ctx.body = `the user by the email ${authInfo.mail} already exists`;
    ctx.status = 400;
    return;
  }
  try {
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(authInfo.password, saltRounds);

    user = await ctx.orm.Usuario.create({
      username: authInfo.username,
      password: hashPassword,
      mail: authInfo.mail,
    });
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
    return;
  }
  ctx.body = {
    username: user.username,
    mail: user.mail,
  };
  ctx.status = 201;
});

router.post('authentication.login', '/login', async (ctx) => {
  let user;
  const authInfo = ctx.request.body;
  try {
    user = await ctx.orm.Usuario.findOne({ where: { mail: authInfo.mail } });
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
    return;
  }
  if (!user) {
    ctx.body = `the user by the email ${authInfo.mail} was not found`;
    ctx.status = 400;
    return;
  }

  const validPassword = await bcrypt.compare(authInfo.password, user.password);

  if (validPassword) {
    ctx.body = {
      username: user.username,
      mail: user.mail,
    };
    ctx.status = 200;
  } else {
    ctx.body = 'Incorrect password';
    ctx.status = 400;
    return;
  }
  // Creamos el JWT. Si quisieras agregar distintos scopes, como por ejemplo
  // "admin", podrian hacer un llamado a la base de datos y cambiar el payload
  // en base a eso
  const expirationSeconds = 1 * 60 * 60 * 24;
  const JWT_PRIVATE_KEY = process.env.JWT_SECRET;

  let userScope = 'user';
  if (authInfo.mail === process.env.ADMIN_MAIL) {
    userScope = 'admin';
  }

  const token = jwt.sign(
    { scope: [userScope] },
    JWT_PRIVATE_KEY,
    { subject: user.id.toString() },
    { expiresIn: expirationSeconds },
  );
  ctx.body = {
    access_token: token,
    token_type: 'Bearer',
    expires_in: expirationSeconds,
  };
  ctx.status = 200;
});

router.post('authentication.editProfile', '/editProfile', async (ctx) => {
  const authInfo = ctx.request.body;
  const oldInfo = ctx.request.header.authorization.split(' ')[1];
  const userId = jwt.decode(oldInfo).sub;
  let user;
  try {
    user = await ctx.orm.Usuario.findOne({ where: { id: userId } });
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
    return;
  }

  const validPassword = await bcrypt.compare(
    authInfo.password,
    user.dataValues.password,
  );
  let updateInfo;

  if (validPassword) {
    updateInfo = {};
    if (authInfo.username) {
      updateInfo.username = authInfo.username;
    }
    if (authInfo.mail) {
      updateInfo.mail = authInfo.mail;
    }
  } else {
    ctx.body = 'Incorrect password';
    ctx.status = 400;
    return;
  }

  const otherUser = await ctx.orm.Usuario.findOne({
    where: { mail: authInfo.mail },
  });
  if (otherUser) {
    ctx.body = `there already exists a user with the email ${authInfo.mail}`;
    ctx.status = 400;
    return;
  }

  try {
    await user.update(updateInfo);
    ctx.body = 'datos actualizados exitosamente';
    ctx.status = 201;
  } catch (error) {
    ctx.body = 'El nuevo usuario o mail tiene un formato invalido';
    ctx.status = 400;
  }
});

// export default router;
module.exports = router;
