"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CartItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CartItems.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      CartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Cart", key: "id" },
        field: "cart_id",
      },
      ProductId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Product", key: "id" },
        field: "product_id",
      },
      Quantity: {
        type: DataTypes.INTEGER,
        field: "quantity",
      },
    },

    {
      sequelize,
      paranoid: true,
      modelName: "CartItems",
      tableName: "cart_items",
      timestamps: false,
    },
  );
  return CartItems;
};
