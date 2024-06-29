'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      Book.belongsTo(models.Book_Shelf, {foreignKey: "Book_ShelfId"})
      Book.belongsToMany(models.Borrow, {through: models.Book_Borrow})
    }
  }
  Book.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Judul tidak boleh kosong"
        },
        notEmpty: {
          msg: "Judul tidak boleh kosong"
        },
      },
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Pengarang tidak boleh kosong"
        },
        notEmpty: {
          msg: "Pengarang tidak boleh kosong"
        },
      },
    },
    publisher: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Penerbit tidak boleh kosong"
        },
        notEmpty: {
          msg: "Penerbit tidak boleh kosong"
        },
      },
    },
    publication_year: DataTypes.INTEGER,
    Book_ShelfId: DataTypes.INTEGER,
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Quantity tidak boleh kosong"
        },
        notEmpty: {
          msg: "Quantity tidak boleh kosong"
        },
      },
    },
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};