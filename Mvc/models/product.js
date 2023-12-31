"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User);
      models.User.hasMany(Product);
    }
  }
  Product.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "image_url",
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at",
      },
      UserId: {
        field: "userId",
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          key: "id",
        },
      },
    },

    {
      sequelize,
      paranoid: true,
      modelName: "Product",
      tableName: "products",
    },
  );
  return Product;
};
