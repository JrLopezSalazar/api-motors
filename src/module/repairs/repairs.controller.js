import { validateRepair } from "./repairs.schema.js"
import { RepairService } from "./repairs.service.js"


const repairService = new RepairService()

export const findAllRepairs = async (req, res, next)  => {
    try {
        const repairs = await repairService.findAll()
        return res.status(200).json(repairs)
    } catch (error) {
       return res.status(500).json(error) 
    }
}

export const createRepair = async (req, res, next)   => {
    try {
        // const {hasError, errorMessages, repairData} = validateRepair(req.body)

        // if(hasError){
        //     return res.status(422).json({
        //         status: 'error',
        //         message: errorMessages
        //     })
        // }

        const repair = await repairService.create(repairData)
        return res.status(201).json(repair)
    } catch (error) {
       return res.status(500).json(error) 
    }
}

export const findOneRepairs = async (req, res, next)   => {
    try {
       const { repair } = req
       return res.status(200).json(repair)

    } catch (error) {
      return res.status(500).json(error)  
    }
}

export const updateRepair = async (req, res, next)  => {
    try {
        const { repair } = req
        await repairService.update(repair)
       return res.status(200).json({
        message: 'repairs has been updated'
       })

    } catch (error) {
      return res.status(500).json(error)  
    }
} 

export const deleteRepair = async (req, res, next)  => {
    try {
        const { repair } = req
        await repairService.delete(repair)
       return res.status(204).json(null)

    } catch (error) {
       return res.status(500).json(error) 
    }
} 