const Product = require("../models/products");

exports.getProducts = async (req, res, next) => {
  const products = await Product.fetchAll();
  res.render("shop/product-list", {
    prods: products,
    pageTitle: "All Products",
    path: "/products"
  });
};

exports.getIndex = async (req, res, next) => {
    const products = await Product.fetchAll();
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/"
    });
  };




exports.getAllProducts = async (req, res, next) => {
  const products = await Product.fetchAll();
  res.json(products);
};

exports.getCart = async (req, res, next) => {
  // get cart from cart model
  res.render('shop/cart',{
    path:'/cart',
    pageTitle:'Your Cart'
  })
};

exports.getCheckout = (req, res, next) => {

    res.render('shop/checkout',{
        path:'/checkout',
        pageTitle:'Checkout'
    })

};

exports.getOrders = (req,res,next) => {

    res.render('shop/orders',{
        path:'/orders',
        pageTitle:'Your Orders'
    })
}
