'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      size: DataTypes.TEXT,
      type: DataTypes.TEXT,
      stock: DataTypes.INTEGER,
      price: DataTypes.FLOAT,
      image: DataTypes.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');
  }
};
