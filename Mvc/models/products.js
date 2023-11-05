const path = require("path");
const fsPromises = require("fs").promises;
const Cart = require("./cart");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json",
);

async function getProductsFromFile() {
  const data = await fsPromises.readFile(p).catch((err) => {
    return [];
  });
  if (data.length > 0) {
    return JSON.parse(data);
  }
  return [];
}

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  genId() {
    const id = Math.ceil(Math.random() * 100);
    return id.toString();
  }

  async save() {
    // update if id is present
    if (this.id) {
      const products = await getProductsFromFile();
      const index = products.findIndex((p) => p.id === this.id);
      products[index] = this;
      await fsPromises.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
      return;
    }

    // create new product
    this.id = this.genId();
    let products = [];

    const fileContent = await getProductsFromFile();
    if (fileContent.length > 0) {
      products = fileContent;
      products.push(this);
    } else {
      products.push(this);
    }

    await fsPromises.writeFile(p, JSON.stringify(products), (err) => {
      console.log(err);
    });
  }

  static fetchAll() {
    return getProductsFromFile();
  }

  static async findById(id) {
    const products = await getProductsFromFile();
    return products.find((p) => p.id === id);
  }

  static async deleteById(id) {
    const products = await getProductsFromFile();
    const index = products.findIndex((p) => p.id === id);
    await Cart.deleteProduct(id, products[index].price);
    products.splice(index, 1);
    await fsPromises.writeFile(p, JSON.stringify(products), (err) => {
      console.log(err);
    });
  }
};
