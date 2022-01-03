const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize("postgres://root:root@localhost:5432/postgres");
sequelize.authenticate();
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);
db.lists = require("./list.model.js")(sequelize, Sequelize);
db.products = require("./product.model.js")(sequelize, Sequelize);

db.users.hasMany(db.lists, { as: "list" });
db.lists.belongsTo(db.users, {
  foreignKey: "user_id",
  as: "user",
});

db.lists.hasMany(db.products, { as: "product" });
db.products.belongsTo(db.lists, {
  foreignKey: "list_id",
  as: "list",
});
module.exports = db;


