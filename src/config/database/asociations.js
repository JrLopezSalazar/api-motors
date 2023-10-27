import { User } from "../../module/users/user.model.js";
import { Repair } from "../../module/repairs/repairs.model.js"


export const initModel = () => {

    User.hasMany(Repair, { foreignKey: 'user_id'}); //, as: 'userCreateRepair' 

    Repair.belongsTo(User, { foreignKey: 'user_id' });
}