// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');
// const Category = require('./Category');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: "decimal(10,2)",
      allowNull: false,
      validate: {
        isDecimal: true,
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      defaultValue: 10,
      validate: {
        isNumeric: true,
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);
Product.belongsToMany(Tag, { 
  through: ProductTag,
  foreignKey: 'product_id',
  onDelete: 'CASCADE'
})
Tag.belongsToMany(Product, { 
  through: ProductTag,
  foreignKey: 'tag_id'
})


module.exports = Product;
