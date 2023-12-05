const getDb = require("../util/database").getDb;
const mongodb = require("mongodb");

class User {
  constructor(id, name, email, password, cart) {
    this.id = id ? new mongodb.ObjectId(id) : null;
    this.name = name;
    this.email = email;
    this.password = password;
    this.cart = cart;
  }

  save() {
    const db = getDb();
    let dbOp;
    if (this.id) {
      dbOp = db.collection("users").updateOne({ _id: this.id }, { $set: this });
    } else {
      dbOp = db.collection("users").insertOne(this);
    }
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new mongodb.ObjectId(userId) });
  }

  addToCart(product) {
    const cartProduct = this.cart.items.findIndex((cp) => {
      return cp.productId.toString() === product._id.toString();
    });
    if (cartProduct >= 0) {
      this.cart.items[cartProduct].quantity++;
    } else {
      this.cart.items.push({
        productId: new mongodb.ObjectId(product._id),
        quantity: 1,
      });
      this.cart.totalPrice += product.price;
      let db = getDb();
      return db
        .collection("users")
        .updateOne(
          { _id: new mongodb.ObjectId(this.id) },
          { $set: { cart: this.cart } },
        );
    }
  }

  getCart() {
    const db = getDb();
    const productIds = this.cart.items.map((i) => {
      return i.productId;
    });
    return db
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) => {
        return products.map((p) => {
          return {
            ...p,
            quantity: this.cart.items.find((i) => {
              return i.productId.toString() === p._id.toString();
            }).quantity,
          };
        });
      });
  }

  deleteItemFromCart(productId) {
    const db = getDb();
    const productIdx = this.cart.items.find((i) => {
      return i.productId.toString() === productId.toString();
    });

    this.cart.items.splice(productIdx, 1);
    this.cart.totalPrice -= product.price;

    return db
      .collection("users")
      .updateOne(
        { _id: this.id },
        { $set: { cart: { items: this.cart.items } } },
      );
  }

  addOrder() {
    const db = getDb();
    const order = {
      items: this.cart.items,
      user: {
        _id: this.id,
        name: this.name,
        email: this.email,
      },
    };
    return db
      .collection("orders")
      .insertOne(this.cart)
      .then((result) => {
        this.cart = { items: [], totalPrice: 0 };
        return db
          .collection("users")
          .updateOne({ _id: this.id }, { $set: { cart: this.cart } });
      });
  }
}

module.exports = User;
