// const Product = require("../models-old/products-ref");
// const Cart = require("../models-old/cart");
const db = require("../models");

exports.getAddProducts = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

exports.getAdminProducts = async (req, res, next) => {
  const products = await db.product.findAll();
  res.render("admin/products", {
    prods: products,
    pageTitle: "Admin Products",
    path: "/admin/products",
  });
};

exports.getEditProduct = async (req, res, next) => {
  const prodId = req.params.productId;
  const editMode = req.query.edit;

  if (!editMode) {
    return res.redirect("/");
  }
  const product = await db.product.findByPk(prodId);
  console.log(product, prodId);
  return res.render("admin/edit-products", {
    pageTitle: "Edit Product",
    path: "/admin/edit-product",
    product: product,
  });
};

exports.postEditProduct = async (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const prodId = req.body.id;
  // const product = new Product(prodId, title, imageUrl, description, price);
  // await product.save();
  try {
    const resp = await db.product.update(
      {
        title: title,
        imageUrl: imageUrl,
        description: description,
        price: price,
      },
      {
        where: {
          id: prodId,
        },
      },
    );
  } catch (e) {
    console.log(e.message);
  }
  res.redirect("/admin/products");
};

exports.postAddProducts = async (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  // const product = new Product(null, title, imageUrl, description, price);
  await db.product.create({
    title: title,
    imageUrl: imageUrl,
    description: description,
    price: price,
  });
  // await product.save();
  res.redirect("/");
};

exports.deleteProduct = async (req, res, next) => {
  const prodId = req.body.id;
  // const cart = await Cart.getCart();
  // const product = cart.products.find((p) => p.id === prodId);
  // if (product) {
  //   await Cart.deleteProduct(prodId, product.price);
  // }

  await db.product.destroy({
    where: {
      id: prodId,
    },
  });
  res.redirect("/admin/products");
};
