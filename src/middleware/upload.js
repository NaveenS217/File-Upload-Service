const util = require("util");
const multer = require("multer");
const maxSize = 5 * 1024 * 1024;

const allowedTypes = /jpeg|jpg|png|pdf/;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/resources/static/assets/uploads/");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, file.originalname);
  },
});

const fileFilter = (req,file,cb) => {
  const mimetype = allowedTypes.test(file.mimetype);
   if (mimetype){
      return cb(null, true);
   } 
  cb(new Error('Only image, text, or PDF files are allowed'));
}

let uploadFile = multer({
  storage,
  limits: { fileSize: maxSize },
  fileFilter
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
