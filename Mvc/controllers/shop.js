const db = require("../models");

exports.getProducts = async (req, res, next) => {
  const products = await db.product.findAll();
  console.log(db);
  res.render("shop/product-list", {
    prods: products,
    pageTitle: "All Products",
    path: "/products",
  });
};

exports.getProduct = async (req, res, next) => {
  const prodId = req.params.productId;
  const product = await db.product.findByPk(prodId);
  console.log(product);
  res.render("shop/product-details", {
    product: product,
    pageTitle: product.title,
    path: "/products",
  });
};

exports.getIndex = async (req, res, next) => {
  const products = await db.product.findAll();

  res.render("shop/index", {
    prods: products,
    pageTitle: "Shop",
    path: "/",
  });
};

exports.getAllProducts = async (req, res, next) => {
  const products = await db.product.findAll();
  res.json(products);
};

exports.getCart = async (req, res, next) => {
  // get cart from cart model
  // const cart = await Cart.getCart();
  if (!cart) {
    return res.render("shop/cart", {
      path: "/cart",
      pageTitle: "Your Cart",
      products: [],
      totalPrice: 0,
    });
  }
  const products = [];
  for (const product of cart.products) {
    const productData = await Product.findById(product.id);
    products.push({ productData, qty: product.qty });
  }
  // console.log(products);
  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "Your Cart",
    products: products,
    totalPrice: cart.totalPrice,
  });
};

exports.postCart = async (req, res, next) => {
  const productId = req.body.productId;
  const product = await Product.findById(productId);
  await Cart.addProduct(product.id, product.price);
  const cart = await Cart.getCart();
  const products = [];
  for (const product of cart.products) {
    const productData = await Product.findById(product.id);
    products.push({ productData, qty: product.qty });
  }

  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "Your Cart",
    products: products,
    totalPrice: cart.totalPrice,
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.postCartDeleteProduct = async (req, res, next) => {
  const productId = req.body.productId;
  //if product present in cart, delete it
  const cart = await Cart.getCart();
  const product = cart.products.find((p) => p.id === productId);
  if (product) {
    const Product = await db.product.findByPk(productId);
    await Cart.deleteProduct(productId, Product.price);
  }
};
