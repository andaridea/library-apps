'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book_Borrow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Book_Borrow.belongsTo(models.Book)
      Book_Borrow.belongsTo(models.Borrow)
    }
  }
  Book_Borrow.init({
    BookId: DataTypes.INTEGER,
    BorrowId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Book_Borrow',
  });
  return Book_Borrow;
};