"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasOne(Cart);
      Cart.belongsTo(models.User);
      Cart.belongsToMany(models.Product, { through: models.CartItems });
      models.Product.belongsToMany(Cart, { through: models.CartItems });
    }
  }
  Cart.init(
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
      modelName: "Cart",
      tableName: "carts",
      timestamps: false,
    },
  );
  return Cart;
};
