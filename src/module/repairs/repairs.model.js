import { DataTypes } from 'sequelize';
import sequelize from '../../config/database/database.js';

export const Repair = sequelize.define('repairs', {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  date: {
    type: DataTypes.DATE(50),
    allowNull: false,
  },
  motorsNumber: {
    type: DataTypes.INTEGER,
    allowNull:false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('completed', 'pending', 'cancelled'),
    defaultValue: 'pending',
    allowNull: false,
  },
  userId: {
    allowNull: false, 

    type: DataTypes.INTEGER,
    field: 'user_id'
  },
});
