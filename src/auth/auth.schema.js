// import z from 'zod';
// import { extractValidationData } from '../utils/errorData.js';



// export const authSchema = z.object({

//   email: z.string().email({ message: 'Invalid email'}),
//   password: z.string().min(6, {message: 'Password does not meet required'}).max(80),

// })



// export function validateRegister(data){
    
//     const result = authSchema.safeParse(data)
    
//     const { 
//       hasError, 
//       errorMessages, 
//       data: userData 
//     } = extractValidationData(result)
    
//     return {
//       hasError,
//       errorMessages,
//       userData
//     }
//   }


//   export function validateLogin(data){

//     const result =  authSchema.partial().safeParse(data)
  
//     const { 
//       hasError, 
//       errorMessages, 
//       data: userData 
//     } = extractValidationData(result)
    
//     return {
//       hasError,
//       errorMessages,
//       userData
//     }
//   }