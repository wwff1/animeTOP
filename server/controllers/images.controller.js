var fs = require('fs');

exports.add = async (req, res) =>{
    const dir = './static';
    var filename = '';
    fs.readdir(dir, (err, files) => {
        filename = `image${files.length}.png`
        copy()
        setTimeout(delet, 2000)
    });
    function copy(){
        fs.copyFile(`C:/Users/Димас/Downloads/image.png`, `F:/anime/animeTOP/server/static/${filename}`, err => { if(err) throw err; // не удалось переместить файл
            console.log('Файл успешно перемещён1')})
    }
    function delet(){
        fs.unlink('C:/Users/Димас/Downloads/image.png', err => { if(err) throw err; // не удалось переместить файл
            console.log('Файл успешно перемещён2')})
    }
}

exports.length = async (req, res) =>{
    const dir = './static';
    fs.readdir(dir, (err, files) => {
        let length = files.length
        res.status(200).json(length)
    });
}