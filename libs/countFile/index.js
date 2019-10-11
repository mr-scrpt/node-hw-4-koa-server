const fs = require('fs');

const countFile = async (dir) =>{
	const files = fs.readdirSync(dir);
	return files.length + 1;
};

module.exports = countFile;