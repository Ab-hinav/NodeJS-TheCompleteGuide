const path = require("path");
const fsPromises = require("fs").promises;

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
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
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  async save() {
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
};
