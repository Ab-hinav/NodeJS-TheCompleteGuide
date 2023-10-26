const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir = require('../util/path');

router.use("/users", (req, res, next) => {
    res.send('<h1>The "Users" Page</h1>');
});

router .get("/", (req, res, nxt) => {
    res.sendFile(path.join(rootDir ,"views", "shop.html"));
});

module.exports = router;