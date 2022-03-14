require('dotenv').config();
const express = require('express')
const config = require('config')
const db = require("./models");
const cors = require("cors");
const fileUpload = require('express-fileupload');
const path = require('path')

const app = express()
db.sequelize.sync();
app.use(cors());

const PORT = process.env.PORT || 5000;
app.use(express.json({ extended: true }))
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
require("./routes/person.routes")(app);



async function start() {
    try {

        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch(e) {
        console.log('Server error', e.message)
        process.exit(1)
    }
}

start();

