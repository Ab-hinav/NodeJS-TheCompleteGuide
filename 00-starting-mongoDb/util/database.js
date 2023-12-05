const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://abhinav16197:X6QCoaUCq2fYNAx8@cluster0.umkbxiu.mongodb.net/",
  )
    .then((result) => {
      db = result.db("shop");
      callback(result);
    })
    .catch((err) => {
      // callback(err);
      throw err;
    });
};

const getDb = () => {
  if (db) {
    return db;
  }
  throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
