import { Router } from "express";
import { router as userRouter } from '../module/users/user.route.js'
import { router as repairRouter} from '../module/repairs/repairs.route.js'
//import {router as authRoute} from '../auth/auth.route.js'

export const router = Router()

//router.use('/register')
router.use('/users', userRouter) 
router.use('/repairs', repairRouter)
//router.use('/login', authRoute)