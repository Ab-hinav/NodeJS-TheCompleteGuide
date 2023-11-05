const Product = require("../models/products");
const Cart = require("../models/cart");

exports.getAddProducts = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

exports.getAdminProducts = async (req, res, next) => {
  const products = await Product.fetchAll();
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
  const product = await Product.findById(prodId);
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
  const product = new Product(prodId, title, imageUrl, description, price);
  await product.save();
  res.redirect("/admin/products");
};

exports.postAddProducts = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);
  product.save();
  res.redirect("/");
};

exports.deleteProduct = async (req, res, next) => {
  const prodId = req.body.id;
  const cart = await Cart.getCart();
  const product = cart.products.find((p) => p.id === prodId);
  if (product) {
    await Cart.deleteProduct(prodId, product.price);
  }

  await Product.deleteById(prodId);
  res.redirect("/admin/products");
};
