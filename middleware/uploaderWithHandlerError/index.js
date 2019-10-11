const upload  = require('../upload');

const uploaderWithHandlerError = async(ctx, next) => {
	try {
		await upload.single("photo")(ctx, async ctx2 => {
			await next();
		});
	} catch (err) {
		ctx.flash('msgfile', err.message);
		await ctx.redirect('/admin');
	}
};

module.exports = uploaderWithHandlerError;