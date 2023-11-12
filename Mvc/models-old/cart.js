const path = require("path");
const fsPromises = require("fs").promises;
// const Product = require("./products");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json",
);

async function getCartFromFile() {
  const data = await fsPromises.readFile(p).catch((err) => {
    return {};
  });
  if (Object.keys(data).length > 0) {
    return JSON.parse(data);
  } else {
    return { products: [], totalPrice: 0 };
  }
}

module.exports = class Cart {
  static async addProduct(id, productPrice) {
    const cart = await getCartFromFile();

    const productIndex = cart.products.findIndex((prod) => prod.id === id);

    if (productIndex === -1) {
      cart.products.push({ id: id, qty: 1 });
    } else {
      cart.products[productIndex].qty++;
    }
    cart.totalPrice += +productPrice;
    await fsPromises.writeFile(p, JSON.stringify(cart));
  }

  static async getCart() {
    const data = await getCartFromFile();
    if (data.products.length > 0) {
      return data;
    }
    return null;
  }

  static async deleteProduct(id, productPrice) {
    const cart = await getCartFromFile();
    if (cart.products.length === 0) {
      return;
    }
    const productIndex = cart.products.findIndex((prod) => prod.id === id);
    const productQty = cart.products[productIndex].qty;
    cart.totalPrice -= productPrice * productQty;
    cart.products.splice(productIndex, 1);
    await fsPromises.writeFile(p, JSON.stringify(cart));
  }
};
