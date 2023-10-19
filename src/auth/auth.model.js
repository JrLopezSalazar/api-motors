


// import { DataTypes } from "sequelize";
// import sequelize from "../config/database/database.js";
// import { encryptedPassword } from "../config/plugins/encripted.password.js";

// const AuthLoginModel = sequelize.define('login', {
  
//   email: {
//     type: DataTypes.STRING(150),
//     allowNull: false,
//     unique: true,
//   },
//   password: {
//     type: DataTypes.STRING(255),
//     allowNull: false,
//   },
 
 
// },{
//   hooks: {
//     beforeCreate: async (user) => {
//       user.password = await encryptedPassword(user.password)
//     },
//   }
// })

// export default AuthLoginModel