const validForm = require('../libs/validators/form');
const sendMailer = require('../libs/sendMail');
const uploader = require('../libs/uploader');
const auth = require('../libs/auth');

/*router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})*/



module.exports.indexPage = async (ctx, next)=>{
  const {request, response } = ctx;
  try {
    const [msgsemail] = ctx.flash('msgsemail');

    const data = await ENGINE.emit('index/get');

    await ctx.render('pages/index',  { title: 'Главная',msgsemail, ...data })

  }catch (err) {
    //response.render('error', {message: err.message})
  }
};

/*
module.exports.loginPage = async (req, res)=>{
  try {
    const data = await ENGINE.emit('login/get');
    const [isLogged] = req.flash('isLogged');

    res.render('pages/login', { title: 'Авторизация', isLogged, ...data })
  }catch (err) {
    res.render('error', {message: err.message})
  }
};


module.exports.auth = async (req, res) => {
  try {
    await auth(req);
    res.redirect(`/admin`);
  }catch (e) {
    req.flash('isLogged', 'Неправильный логин или пароль!');
    res.redirect(`/login`);
  }

};

module.exports.sendMsg = async(req, res) => {

  const {name, email, message} = req.body;
  const valid = await validForm(name, email, message);

  if(valid.name === 'ValidationError'){
    const errMessage = valid.message;
    req.flash('msgsemail', errMessage);
    res.redirect(`/`);
    return false;
  }

  try {
    await sendMailer({name, email, message});
    req.flash('msgsemail', 'Успех');

    res.redirect(`/`)
  }catch (err) {
    throw new Error(`Ошибка отправки почты ${err}`);
  }



};

module.exports.adminPage = async (req, res) => {
  const [msgskill] = req.flash('msgskill');
  const [msgfile] = req.flash('msgfile');

  try{
    const data = await ENGINE.emit('admin/get');
    res.render('pages/admin', { title: 'Авторизация', msgskill, msgfile, ...data })
  }catch (err) {
    res.render('error', {message: err.message})
  }
};

module.exports.skillsEdited = async (req, res) => {
  const form = JSON.parse(JSON.stringify(req.body));
  console.log(form);
  console.log(req.body);
  try{
    const data = await ENGINE.emit('admin/skillsEdited', form);
    req.flash('msgskill', data);
    res.redirect('/admin');
  }catch (err) {
    req.flash('msgskill', err);
    res.redirect('/admin');

  }
};

module.exports.uploadWorks = async (req, res) => {
  try{
    const {data} = await uploader(req, res);

    await ENGINE.emit('admin/addWork', data);

    req.flash('msgfile', 'Файл успешно загружен');
    res.redirect('/admin');
  }catch (err) {
    req.flash('msgfile', `Ошибка при загрузке файла ${err.message}`);
    res.redirect('/admin');

  }
};

*/

