import { DataTypes } from 'sequelize';
import sequelize from '../../config/database/database.js';
import { encryptedPassword } from '../../config/plugins/encripted.password.js';

export const User = sequelize.define('users', {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(250),
    unique: true,
    allowNull: false,
    // validate: {
    //     isEmail: true
    //   },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  role: {
    type: DataTypes.ENUM('client', 'employee'),
    defaultValue: 'client',
    allowNull: false,
  },

  status: {
    type: DataTypes.ENUM('available', 'disabled'),
    defaultValue: 'available',
    allowNull: false,
  },
}, {
  hooks: {
    beforeCreate: async (user) => {
      user.password = await encryptedPassword(user.password)
    }
  }
});
