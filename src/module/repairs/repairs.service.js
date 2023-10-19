
import { Repair } from "./repairs.model.js";




export class RepairService {


    async findOne(id){
        return await Repair.findOne({
            where: {
                id,
                status: 'pending'
            }
        })

    }
    async findAll(){
        return await Repair.findAll({
            where: {
                status: 'pending'
            }
        })

    }
    async create(data){
        return await Repair.create(data)

    }

    async update(repair){
        return await repair.update({status: 'completed'})
    }

    async delete(repair){
        return await repair.update({ status: 'cancelled'})
    } 
}