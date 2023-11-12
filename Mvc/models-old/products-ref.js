// const Cart = require("./cart");
// const db = require("../util/database");
//
// module.exports = class Product {
//   constructor(id, title, imageUrl, description, price) {
//     this.id = id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }
//
//   genId() {
//     const id = Math.ceil(Math.random() * 100);
//     return id.toString();
//   }
//
//   async save() {
//     // update if id is present
//     if (this.id == null) {
//       const query = {
//         name: "save-new-product",
//         text: 'INSERT INTO products (title,price,description,"imageUrl") VALUES($1,$2,$3,$4)',
//         values: [this.title, this.price, this.imageUrl, this.description],
//       };
//       const id = await db.query(query);
//     } else {
//       const query = {
//         name: "update-product",
//         text: 'UPDATE products set title = $1 ,price = $2 , description = $3, "imageUrl" = $4 where id = $5 ',
//         values: [
//           this.title,
//           this.price,
//           this.description,
//           this.imageUrl,
//           this.id,
//         ],
//       };
//       await db.query(query);
//     }
//   }
//
//   static async fetchAll() {
//     const data = await db.query("Select * from products");
//     return data.rows;
//   }
//
//   static async findById(id) {
//     const query = {
//       // give the query a unique name
//       name: "fetch-product-by-id",
//       text: "SELECT * FROM products WHERE id = $1",
//       values: [id],
//     };
//     const data = await db.query(query);
//     return data.rows[0];
//   }
//
//   static async deleteById(id) {
//     const query = {
//       name: "delete-by-id",
//       text: "DELETE ",
//     };
//   }
// };
