const { Sequelize } = require('sequelize');

const Product = require('./models/Product');
const User = require('./models/User');
const Order = require('./models/Order');


const sequelize = new Sequelize('ecommerce_api', 'root', 'root', {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false,
  });
  

  const models = [
    Product,
    User,
    Order
  ];


  for (let model of models) {
    model(sequelize);
  }




const { products, users, orders    } = sequelize.models;
orders.belongsTo(users); 
orders.belongsTo(products); 




module.exports = sequelize;