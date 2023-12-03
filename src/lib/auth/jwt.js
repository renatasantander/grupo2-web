const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');

dotenv.config();

function getJWTScope(token) {
  const secret = process.env.JWT_SECRET;
  const payload = jwt.verify(token, secret);
  return payload.scope;
}

async function isUser(ctx, next) {
  await next();
  const token = ctx.request.header.authorization.split(' ')[1];
  const scope = getJWTScope(token);
  ctx.assert(scope.includes('user'), 403, 'you are not a user');
}

async function isAdmin(ctx, next) {
  await next();
  const token = ctx.request.header.authorization.split(' ')[1];
  const scope = getJWTScope(token);
  ctx.assert(scope.includes('admin'), 403, 'you are not a admin');
}

async function verifyToken(ctx, next) {
  try {
    const token = ctx.request.header.authorization.split(' ')[1];
    if (!token) {
      ctx.throw(401, 'Token not found');
    }
    const secret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secret);
    ctx.state.usuario = decoded;
    await next();
  } catch (error) {
    ctx.throw(401, 'Invalid or expired token');
  }
}

module.exports = {
  isUser, isAdmin, verifyToken,
};
