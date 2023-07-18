const { Sequelize, DataTypes } = require('sequelize')
const { default: sequelize } = require('../database/db')

const User = sequelize.define('User', {
  // Model attributes are defined here
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  balance: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
})

export default User
