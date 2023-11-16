"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User);
      models.User.hasMany(Order);
      Order.belongsToMany(models.Product, { through: models.OrderItems });
      models.Product.belongsToMany(Order, { through: models.OrderItems });
    }
  }
  Order.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      UserId: {
        type: DataTypes.INTEGER,
        references: { model: "User", key: "id" },
        field: "user_id",
      },
    },

    {
      sequelize,
      paranoid: true,
      modelName: "Order",
      tableName: "orders",
      timestamps: false,
    },
  );
  return Order;
};
