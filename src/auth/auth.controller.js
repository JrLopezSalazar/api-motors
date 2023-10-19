// import {  validateLogin } from './auth.schema.js';
// //import { AuthService } from './auth.service.js';


// const authService = new AuthService()

// export const login = async (req, res, next) => {
//     const { hasError, errorMessages, userData } = validateLogin(req.body)
  
//   if(hasError){
//     return res.status(422).json({
//       status: 'error',
//       message: errorMessages
//     })
//   }

//   //1. validar que el usuario exista en base de datos
//   const user = await authService.findOneUserByEmail(userData.email)

//   if(!user){
//     return next(new AppError('This account does not exist', 404))
//   }

//   const isCorrectPassword = await verifyPassword(
//     userData.password,
//     user.password
//   )
//   //2 validar la contraseña si es correcta
//   if(!isCorrectPassword){
//     return next(new AppError('Incorrect email or password', 401))
//   }
//   //3 generar el token
//   const token = await generateJWT(user.id)
//   //4. enviar la respuesta al cliente
//   return res.status(200).json({
//     token,
//     user: {
//       id: user.id,
//       fullname: user.fullname,
//       email: user.email,
//       role: user.role,
//       gender: user.gender
//     }
//   })
// };




// // export const register = async (req, res, next) => {
// //   const { hassError, errorMessages, userData } = validateRegister(req.body);

// //   if (hassError){
// //       return res.status(422).json({
// //         status: 'error',
// //         message: errorMessages,
// //       });
// //   }

// //   const user = await authService.createUser(userData)

// //   return res.status(201).json(user)
// // };
