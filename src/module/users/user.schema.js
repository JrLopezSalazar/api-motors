import z from 'zod'
import { extractValidationData } from '../../utils/errorData.js'

const userSchema = z.object({
  name: z.string().min(2).max(240),
  email: z.string(),
  password: z.string().min(6, {message: 'Password does not meet required'}).max(80),
  role: z.enum(['client', 'employee']),
  status: z.enum(['available', 'disabled'])

})

const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {message: 'Password does not meet required'}).max(80)
})



export const validateUser = data => {
    
    const result = userSchema.safeParse(data)
    
    const { 
      hasError, 
      errorMessages, 
      data: userData 
    } = extractValidationData(result)
    
    return {
      hasError,
      errorMessages,
      userData
    }
  }


  export const validatePartialUser = data => {

    const result = userSchema.partial().safeParse(data)
  
    const { 
      hasError, 
      errorMessages, 
      data: passengerData 
    } = extractValidationData(result)
    
    return {
      hasError,
      errorMessages,
      passengerData
    }
  }

  export const validateLogin = data => {

         const result = loginUserSchema.safeParse(data)
      
         const { 
           hasError, 
           errorMessages, 
           data: userData 
         } = extractValidationData(result)
        
     return {
       hasError,
       errorMessages,
       userData
     }
   }