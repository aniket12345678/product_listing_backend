const multer = require("multer");
const path = require('path');

const OperationHandler = {
    success: (res, message, data = {}) => {
        res.status(200).send({
            message: message,
            data: data,
            code: 200
        });
    },
    error: (res, error) => {
        console.log(`error:- ${error.message}`);
        res.status(500).send({
            message: error.message,
            code: 500
        });
    },
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.fieldname + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage });

module.exports = { upload, OperationHandler }