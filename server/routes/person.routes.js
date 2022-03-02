module.exports = app => {
    const images = require("../controllers/images.controller.js");
    var router = require("express").Router();


    router.post("/add",images.add);


    app.use("/api/image", router);
};
