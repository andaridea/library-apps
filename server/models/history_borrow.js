'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History_Borrow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      History_Borrow.belongsTo(models.Borrow)
    }
  }
  History_Borrow.init({
    date_borrow: DataTypes.DATE,
    date_return: DataTypes.DATE,
    duration: {
      type: DataTypes.INTEGER,
      defaultValue: 14
    },
    BorrowId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'History_Borrow',
  });
  return History_Borrow;
};