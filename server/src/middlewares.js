const { 'X-API-KEY': API_KEY } = process.env;
const multer = require('multer');
const path = require('path');

const checkUser = (req, res, next, routeFor) =>  {
    console.log('usertype - ', routeFor);
    next();
}

const checkReqMethod = (req, res, next) => {
    if(req.headers['x-api-key'] && req.headers['x-api-key'] == API_KEY) {
        next();
    } else {
        res.status(401).json({
            status: false,
            msg: "Unauthorized Request",
            data: null
        })
    }
}

const allowedImgs = [
    // "image/png",
    "image/jpg",
    "image/jpeg",
    "image/webp"
];

const uploadFile = multer({
    storage: multer.diskStorage({
        destination: "./public/uploads",
        filename: (req, file, callback) => {
            callback(null, file.fieldname+'-'+Date.now()+path.extname(file.originalname))
        }
    }),
    fileFilter: (req, file, callback) => {
        if(!allowedImgs.includes(file.mimetype)) {
            callback(new Error('File type is not Allowed'))
        } else {
            callback(null, true)
        }
    }
});

module.exports = {
    checkUserAuth: routeFor => (req, res, next) => checkUser(req, res, next, routeFor),
    checkReqMethod: checkReqMethod,
    uploadFile: uploadFile
}