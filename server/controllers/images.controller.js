var fs = require('fs');

exports.add = async (req, res) =>{
    const dir = './static';
    let filename = '';

    fs.readdir(dir, (err, files) => {
        filename = `image${files.length}.png`
        console.log(files.length);
    });
    console.log(filename)
    const path = `F:/anime/animeTOP/server/static/${filename}`
    console.log(path)
    fs.copyFile(`C:/Users/Димас/Downloads/image.png`, path, err => { if(err) throw err; // не удалось переместить файл
        console.log('Файл успешно перемещён1')})
    fs.unlink('C:/Users/Димас/Downloads/image.png', err => { if(err) throw err; // не удалось переместить файл
            console.log('Файл успешно перемещён2')})
}
