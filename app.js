const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const session = require('koa-session');
const flash = require('koa-connect-flash');
const path = require('path');

//const index = require('./routes/index');
const route = require('./routes');

require('dotenv').config();
require('./buses');
require('./engine');
require('./database');

// error handler
onerror(app);
const config = require('./config');
// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}));
app.use(session(config.session, app));
app.use(json());
app.use(logger());
app.use(flash());
app.use(require('koa-static')(path.join(__dirname, 'public')));

app.use(views(path.join(__dirname, 'views'), {
  extension: 'pug'
}));

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
//app.use(index.routes(), index.allowedMethods());
app.use(route.routes(), route.allowedMethods());


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
