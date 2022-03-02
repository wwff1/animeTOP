var fs = require('fs');

exports.add = async (req, res) =>{
    console.log("aaaaaaaaa", req.body.image);
    const imageBuffer = req.body.image;
    fs.createWriteStream('static/wrgo.png').write(imageBuffer);
}
