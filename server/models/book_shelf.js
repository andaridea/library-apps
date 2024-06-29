'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book_Shelf extends Model {
    static associate(models) {
      Book_Shelf.hasMany(models.Book, {foreignKey: "Book_ShelfId"})
    }
  }
  Book_Shelf.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Nama tidak boleh kosong"
        },
        notEmpty: {
          msg: "Nama tidak boleh kosong"
        },
      },
    },
    description: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Book_Shelf',
  });
  return Book_Shelf;
};