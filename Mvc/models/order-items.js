"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OrderItems.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      OrderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Order", key: "id" },
        field: "order_id",
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
      modelName: "OrderItems",
      tableName: "orders_items",
      timestamps: false,
    },
  );
  return OrderItems;
};
