import { User } from "../../module/users/user.model.js";
import { Repair } from "../../module/repairs/repairs.model.js"


export const initModel = () => {

    User.hasMany(Repair, { foreignKey: 'userId', as: 'userCreateRepair' });

    Repair.belongsTo(User, { foreignKey: 'userId' });
}