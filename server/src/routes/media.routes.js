const router = require("express").Router();
const Controller = require("../controllers/media.controller");
const { uploadFile } = require('../middlewares');

router.post("/upload", uploadFile.fields([{ name: "media-file" }]), Controller.uploadMedia);

module.exports = router;