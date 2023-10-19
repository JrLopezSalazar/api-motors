import { Router } from 'express';
import { createUser, deleteUser, findAllUsers, updateUser, findOneUser } from './user.controller.js'
import { validExistUser } from './user.middleware.js';
import { login } from './user.controller.js';


export const router = Router();

router.post('/login', login)
router.route('/')
.get(findAllUsers)
.post(createUser);

router.use('/:id', validExistUser)

router.route('/:id')
//.post('/login', login)
.get(findOneUser)
.patch(updateUser)
.delete(deleteUser);
 