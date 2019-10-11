const path = require("path");
const multer = require("@koa/multer");
const countFile = require('../../libs/countFile');
const uploadDir = path.normalize(process.env.UP_LOAD_WORKS_PATH);


const upload = multer({
	storage: multer.diskStorage({
		destination: uploadDir,
		filename: async (req, file, cb) => {
			const extension = path.extname(file.originalname);
			const count = await countFile(uploadDir);
			cb(null, `Work${count}${extension}`);
		}
	}),
	fileFilter: (req, file, cb) => {
		const allowedFileTypes = ["image/png", "image/jpg", "image/jpeg"];
		if (!allowedFileTypes.includes(file.mimetype)) {
			return cb(new Error("File must be image"));
		}
		cb(null, true);
	},
	limits: {
		fileSize: 2097152
	}
});

module.exports = upload;