const validForm = require('../libs/validators/form');
const sendMailer = require('../libs/sendMail');
const uploader = require('../libs/uploader');
const auth = require('../libs/auth');



module.exports.indexPage = async (ctx)=>{
  //const {request, response } = ctx;
  try {
    const [msgsemail] = ctx.flash('msgsemail');

    const data = await ENGINE.emit('index/get');

    await ctx.render('pages/index',  { title: 'Главная',msgsemail, ...data })

  }catch (err) {
		await ctx.render('error', {message: err.message})
  }
};

module.exports.sendMsg = async(ctx) => {

	const {name, email, message} = ctx.request.body;
	const valid = await validForm(name, email, message);

	if(valid.name === 'ValidationError'){
		const errMessage = valid.message;
		ctx.flash('msgsemail', errMessage);
		ctx.redirect(`/`);
		return false;
	}

	try {
		await sendMailer({name, email, message});
		ctx.flash('msgsemail', 'Успех');

		ctx.redirect(`/`)
	}catch (err) {
		throw new Error(`Ошибка отправки почты ${err}`);
	}

};

module.exports.loginPage = async (ctx)=>{
  try {
    const data = await ENGINE.emit('login/get');
    const [isLogged] = ctx.flash('isLogged');

		await ctx.render('pages/login', { title: 'Авторизация', isLogged, ...data })
  }catch (err) {
		await ctx.render('error', {message: err.message})
  }
};

module.exports.auth = async (ctx) => {
  try {
    await auth(ctx.request);
		await ctx.redirect(`/admin`);
  }catch (e) {
		ctx.flash('isLogged', 'Неправильный логин или пароль!');
		await ctx.redirect(`/login`);
  }

};

module.exports.adminPage = async (ctx) => {
  const [msgskill] = ctx.flash('msgskill');
  const [msgfile] = ctx.flash('msgfile');
  try{
    const data = await ENGINE.emit('admin/get');
		await ctx.render('pages/admin', { title: 'Авторизация', msgskill, msgfile, ...data })
  }catch (err) {
		await ctx.render('error', {message: err.message})
  }
};

module.exports.skillsEdited = async (ctx) => {

  try{
    const data = await ENGINE.emit('admin/skillsEdited', ctx.request.body);
		ctx.flash('msgskill', data);
		await ctx.redirect('/admin');
  }catch (err) {
		ctx.flash('msgskill', err);
		await ctx.redirect('/admin');
  }
};

module.exports.uploadWorks = async (ctx) => {
	const fields = JSON.parse(JSON.stringify(ctx.request.body));
	//console.log(ctx.request.file);
	console.log(ctx.request.body);
  /*try{
    const {data} = await uploader(ctx.request);
    await ENGINE.emit('admin/addWork', data);
		ctx.flash('msgfile', 'Файл успешно загружен');
		await ctx.redirect('/admin');
  }catch (err) {
		await ctx.flash('msgfile', `Ошибка при загрузке файла ${err.message}`);
		await ctx.redirect('/admin');
  }*/
};


