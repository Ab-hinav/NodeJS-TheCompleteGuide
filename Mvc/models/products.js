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
  if (data != undefined) {
    return JSON.parse(data);
  }
  return [];
}

module.exports = class Product {
  constructor(title) {
    this.title = title;
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

  static async fetchAll() {
    return getProductsFromFile();
  }
};
