const express = require('express');
const rootDir = require('../util/path');
const router = express.Router();
const path = require('path');


router.get("/add-product", (req, res, next) => {
    res.sendFile(path.join(rootDir, "views", "add-product.html"));
  });
  
router.post("/product", (req, res, next) => {
      // console.log(req);
    console.log(req.body);
  //   res.redirect("/");
    res.send(`${JSON.stringify(req.body)}`);
});

module.exports = router;