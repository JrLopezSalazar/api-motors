import { Router } from 'express';
import {  validRepair } from './repairs.middleware.js';
import { protect } from '../users/user.middleware.js';

import {
  createRepair,
  findAllRepairs,
  findOneRepairs,
  updateRepair,
  deleteRepair,
} from './repairs.controller.js';
import { restrictTo } from '../users/user.middleware.js';

export const router = Router();

router
  .route('/')
  .get(protect, restrictTo('employee'), findAllRepairs)
  .post(createRepair);

router.use('/:id', validRepair);

router
  .route('/:id')
  .get(protect, restrictTo('employee'), findOneRepairs)
  .patch(protect, restrictTo('employee'), updateRepair)
  .delete(protect, restrictTo('employee'), deleteRepair);
