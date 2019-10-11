const Router = require('koa-router');
const router = new Router();
const controllers = require('../constrollers');
const uploaderWithHandlerError  = require('../middleware/uploaderWithHandlerError');

router.get('/',  controllers.indexPage);
router.post('/',  controllers.sendMsg);
router.get('/login',  controllers.loginPage);
router.post('/login',  controllers.auth);
router.get('/admin',  controllers.adminPage);
router.post('/admin/skills',  controllers.skillsEdited);
router.post('/admin/upload',  uploaderWithHandlerError, controllers.uploadWorks);


/*
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})*/

module.exports = router;
