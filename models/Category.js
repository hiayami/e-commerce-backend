const { Model, DataTypes } = require('sequelize');
const Product = require('./Product');

const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
  {
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

Category.hasMany(Product, { foreignKey: 'category_id' })
Product.hasOne(Category, {
  sourceKey: 'category_id',
  foreignKey: 'id'
})
module.exports = Category;
