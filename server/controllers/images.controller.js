const db = require("../models");
const Pictures = db.Pic_model;
const {QueryTypes} = require('sequelize');
var fs = require('fs');


exports.add = async (req, res) =>{
    const dir = './static';
    var filename = '';
    fs.readdir(dir, (err, files) => {
        filename = `image${files.length}.png`
        copy()
        setTimeout(delet, 2000)
        console.log(filename)
        res.status(200).json(filename)
    });
    var copyTrue = false
    var deleteTrue = false
    function copy(){
        fs.copyFile(`C:/Users/Димас/Downloads/image.png`, `F:/anime/animeTOP/server/static/${filename}`, err => { if(err) throw err; // не удалось переместить файл
            console.log('Файл успешно перемещён1')})
        copyTrue = true
    }
    function delet(){
        fs.unlink('C:/Users/Димас/Downloads/image.png', err => { if(err) throw err; // не удалось переместить файл
            console.log('Файл успешно перемещён2')})
        deleteTrue = true
    }
}

exports.length = async (req, res) =>{
    const dir = './static';
    fs.readdir(dir, (err, files) => {
        let length = files.length
        res.status(200).json(length)
    });
}

exports.findAll = async (req, res)=>{
    Pictures.findAll().then(
        data => {
            res.send(data);
        }
    ).catch(err=>{
        res.status(500).send({
            message: err.message || "Some problem"
        });
    });
}

exports.AddPics = async (req, res) =>{
    try{

        const {title, size_pic, time} = req.body;
        console.log(req.body)
        const pic = new Pictures({ title, size_pic, time })
        const candidate = await Pictures.findOne({ where: {title: title }})

        if (candidate) {
            return res.status(400).json({ message: 'Такой ))) уже существует' })
        }

        pic.save();
        res.status(201).json({ message: 'Rfhnbyrf lj,fdktyf' })

    }
    catch (e){
        res.status(500).json({message: "Xnj nj yt nfr"})
    }
}
