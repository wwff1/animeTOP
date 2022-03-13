module.exports = app => {
    const images = require("../controllers/images.controller.js");
    var router = require("express").Router();


    router.post("/add",images.add);
    router.get("/length",images.length);


    app.use("/api/image", router);
};
