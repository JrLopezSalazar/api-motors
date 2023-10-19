import { Router } from 'express'
import { validRepair} from './repairs.middleware.js'

import {
    createRepair,
    findAllRepairs,
    findOneRepairs,
    updateRepair,
    deleteRepair
} from './repairs.controller.js'



export const router = Router()



router.route('/')
.get(findAllRepairs)
.post(createRepair)

router.use('/:id', validRepair)

router.route('/:id')
.get(findOneRepairs)
.patch(updateRepair)
.delete(deleteRepair)
