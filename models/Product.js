const { DataTypes } = require('sequelize');


module.exports = (sequelize) => sequelize.define( 'products' , {
id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
title: DataTypes.STRING,
description: DataTypes.TEXT,
size: DataTypes.TEXT,
type: DataTypes.TEXT,
stock: DataTypes.INTEGER,
price: DataTypes.FLOAT,
image: DataTypes.STRING,
 createdAt: DataTypes.DATE, 
 updatedAt: DataTypes.DATE,
});