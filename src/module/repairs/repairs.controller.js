import { AppError, catchAsync } from '../../erros/index.js';
import { validatePartialRepair, validateRepair } from './repairs.schema.js';
import { RepairService } from './repairs.service.js';

const repairService = new RepairService();

export const findAllRepairs = catchAsync( async (req, res, next) => {
  
    const repairs = await repairService.findAll();
    return res.status(200).json(repairs);
  
});

export const createRepair = catchAsync( async (req, res, next) => {

    const { hasError, errorMessages, repairData } = validateRepair(req.body);

    if (hasError) {
      return res.status(422).json({
        status: 'error',
        message: errorMessages,
      });
    }

    const repair = await repairService.create(repairData);
    return res.status(201).json(repair);

  
  
});

export const findOneRepairs = catchAsync( async (req, res, next) => {
  
    const { repair } = req;
    return res.status(200).json(repair);
   
});

export const updateRepair =catchAsync(async (req, res, next) => {
  
   
    const {id } = req.params 

    const repair =    await repairService.findOne(id);
    if(!repair){
        return next(new AppError(`Repair with id: ${id} not found `))
    }

    const repairUpdate = await repairService.update(repair)
    return res.status(200).json(repairUpdate)
  
});

export const deleteRepair =catchAsync (async (req, res, next) => {
 
    const { repair } = req;
    await repairService.delete(repair);
    return res.status(204).json(null);
   
});
