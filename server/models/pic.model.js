module.exports = (sequelize, Sequelize) => {
    const Pic_model = sequelize.define("pictures", {
        id_pic:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING
        },
        size_pic: {
            type: Sequelize.INTEGER
        }

    });

    return Pic_model;
};
