module.exports = app => {
    const images = require("../controllers/images.controller.js");
    var router = require("express").Router();


    router.post("/add", images.add);
    router.get("/length", images.length);
    router.post("/addPic", images.AddPics);
    router.get("/getAll", images.findAll);

    app.use("/api/image", router);
};
