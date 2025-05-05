const upload = require("./multer-storage");

exports.singleFile = upload?.single('image');
exports.singleFileRecord = upload?.single('record');
exports.muitiFile = upload?.fields([{ name: 'image', maxCount: 1 }, { name: 'audio', maxCount: 1 }])


