import { UserService } from "./user.service.js"
import { validateUser } from './user.schema.js '
import { validatePartialUser } from "./user.schema.js"
import { validateLogin } from "./user.schema.js"
import generateJWT from "../../config/plugins/generate-jwt.plugin.js"
import { AppError} from "../../erros/index.js"



const userService = new UserService()




export const findAllUsers = async(req, res, next) => {
    try {
        const users = await userService.findAll()
        return res.status(200).json(users)

    } catch (error) {
        return res.status(500).json(error)
        
    }
}


export const createUser = async(req, res, next) => {
    try {
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
        
    } catch (error) {
        return res.status(500).json(error)
        
    }
}
 

export const  findOneUser = (req, res, next) => {
    try {
       const { user } = req
       return res.status(200).json(user) 
    } catch (error) {
        return res.status(500).json(error)
        
    }
}

export const  updateUser = async(req, res, next) => {
    try {
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
        

    } catch (error) {
        return res.status(500).json(error)
        
    }
}

export const  deleteUser = async (req, res, next) => {
   try {
    const { user } = req
    await userService.delete(user)
    return res.status(204).json(null)
   } catch (error) {
    return res.status(500).json(error)
    
   } 
} 

export const login = async (req, res, next) => {
    const { hasError, errorMessages, userData } = validateLogin(req.body)
  
  if(hasError){
    return res.status(422).json({
      status: 'error',
      message: errorMessages
    })
  }

  //1. validar que el usuario exista en base de datos
  const user = await userService.findUserByEmail(userData.email)

  if(!user){
    return next(new AppError('This account does not exist', 404))
  }

  const isCorrectPassword = await verifyPassword(
    userData.password,
    user.password
  )
  //2 validar la contraseña si es correcta
  if(!isCorrectPassword){
    return next(new AppError('Incorrect email or password', 401))
  }
  //3 generar el token
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