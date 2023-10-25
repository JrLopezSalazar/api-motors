import { UserService } from "./user.service.js"
import { validateUser } from './user.schema.js '
import { validatePartialUser } from "./user.schema.js"
import { validateLogin } from "./user.schema.js"
import generateJWT from "../../config/plugins/generate-jwt.plugin.js"
import { AppError} from "../../erros/index.js"
import { encryptedPassword, verifyPassword} from "./../../config/plugins/encripted.password.js"
import { catchAsync } from "../../erros/index.js"



const userService = new UserService()




export const findAllUsers = catchAsync (async(req, res, next) => {
    
        const users = await userService.findAll()
        return res.status(200).json(users)

    
})


export const createUser = catchAsync (async(req, res, next) => {
    
        const { hasError, errorMessages, userData } = validateUser(req.body)
       
        if(hasError){
            return res.status(422).json({
                status: 'error',
                message: errorMessages
            })
        }

        const user = await userService.create(userData)
        const token = await generateJWT(user.id)
         
        return res.status(201).json({
          token,
          user:  {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            
          }
        })
        
   
})
 

export const  findOneUser = catchAsync ((req, res, next) => {
   
       const { user } = req
       return res.status(200).json(user) 
    
})

export const  updateUser =catchAsync (async(req, res, next) => {
    
        const { hasError, errorMessages, userData } = validatePartialUser(req.body)

        if(hasError){
            return res.status(404).json({
                status: 'error',
                message: errorMessages
            })
        }
        const { email, name } = req.body
        const { user } = req
        await userService.update(user, {email, name})
        return res.status(200).json(userData)
        

    
})

export const  deleteUser =catchAsync (async (req, res, next) => {
   
    const { user } = req
    await userService.delete(user)
    return res.status(204).json(null)
    
} 
)
export const login = async (req, res, next) => {
    const { hasError, errorMessages, userData } = validateLogin(req.body)
  
  if(hasError){
    return res.status(422).json({
      status: 'error',
      message: errorMessages
    })
  }

  

  
  const user = await userService.findUserByEmail(userData.email)

  if(!user){
    return next(new AppError('This account does not exist', 404))
  }


  const isCorrectPassword = await verifyPassword(
    userData.password,
    user.password
  )
  
  if(!isCorrectPassword){
    return next(new AppError('Incorrect email or password', 401))
  }

  
  const token = await generateJWT(user.id)
  //4. enviar la respuesta al cliente
  return res.status(200).json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    }
  })
};


export const changePassword = catchAsync(async(req, res, next) => {
  
  const { sessionUser } = req;

  const { currentPassword, newPassword } = req.body;

  if( currentPassword === newPassword ){
    return next(new AppError('The password cannot be equals', 400))
  }

  const isCorrectPassword = await verifyPassword(
    currentPassword,
    sessionUser.password
  )
 
  if(!isCorrectPassword){
    return next(new AppError('Incorrect email or password', 401))
  }


  const hashedNewPassword = await encryptedPassword(newPassword)

  await userService.update(sessionUser, {
    password: hashedNewPassword,
    chagedPasswordAt: new Date(),
  })

  return res.status(200).json({
    message: 'The user password was updated successfully'
  })
})

export const deleteAccount = catchAsync(async(req, res, next) => {
  const { user } = req;
  
  await userService.delete(user)

  res.status(204).json(null)
})