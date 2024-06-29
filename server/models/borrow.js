'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Borrow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Borrow.hasOne(models.History_Borrow)
      Borrow.belongsToMany(models.Book, {through: models.Book_Borrow})
      Borrow.belongsTo(models.Student)
    }
  }
  Borrow.init({
    date_borrow: DataTypes.DATE,
    date_return: DataTypes.DATE,
    status: DataTypes.DATE,
    StudentId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Borrow',
  });
  return Borrow;
};