const db = require("../models");

exports.getProducts = async (req, res, next) => {
  const products = await db.Product.findAll();
  console.log(db);
  res.render("shop/product-list", {
    prods: products,
    pageTitle: "All Products",
    path: "/products",
  });
};

exports.getProduct = async (req, res, next) => {
  const prodId = req.params.productId;
  const product = await db.Product.findByPk(prodId);
  console.log(product);
  res.render("shop/product-details", {
    product: product,
    pageTitle: product.title,
    path: "/products",
  });
};

exports.getIndex = async (req, res, next) => {
  const products = await db.Product.findAll();
  console.log(db.Product.getAttributes());

  res.render("shop/index", {
    prods: products,
    pageTitle: "Shop",
    path: "/",
  });
};

exports.getAllProducts = async (req, res, next) => {
  const products = await db.Product.findAll();
  res.json(products);
};

exports.getCart = async (req, res, next) => {
  const cart = await req.user.getCart();
  const products = await cart.getProducts();
  console.log(products);

  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "Your Cart",
    products: products,
    totalPrice: 0,
  });
};

exports.postCart = async (req, res, next) => {
  const productId = req.body.productId;

  const cart = await req.user.getCart();
  const products = await cart.getProducts({ where: { id: productId } });
  let product = null;
  if (products.length > 0) {
    product = products[0];
  }

  if (!product) {
    product = await db.Product.findByPk(productId);
    await cart.addProduct(product, { through: { Quantity: 1 } });
    return res.redirect("/cart");
  }

  const qty = product.CartItems.Quantity + 1;
  await cart.addProduct(product, { through: { Quantity: qty } });
  return res.redirect("/cart");
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};

exports.getOrders = async (req, res, next) => {
  let orders = await req.user.getOrders({ include: db.Product });
  if (orders.length == 0) {
    orders = [];
  }
  // console.log(orders);

  // orders.forEach((o) => {
  //   o.Products.forEach((p) => console.log(p.OrderItems.Quantity));
  // });
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
    orders: orders,
  });
};

exports.postCartDeleteProduct = async (req, res, next) => {
  const productId = req.body.productId;
  const cart = await req.user.getCart();
  const products = await cart.getProducts({ where: { id: productId } });
  if (products.length > 0) {
    const product = products[0];
    await product.CartItems.destroy();
    return res.redirect("/cart");
  } else {
    res.redirect("/cart");
  }
};

exports.postOrder = async (req, res, next) => {
  const cart = await req.user.getCart();
  const products = await cart.getProducts();

  const mproducts = products.map((product) => {
    product.OrderItems = { Quantity: product.CartItems.Quantity };
    return product;
  });

  await cart.setProducts(null);

  const order = await req.user.createOrder();

  await order.addProducts(mproducts);

  res.redirect("/orders");
};
