import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const Institutions = db.define('institutions', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING
    },
    address:{
        type: DataTypes.STRING
    }
},{
    freezeTableName:true
});

(async () => {
    await db.sync();
})();

export default Institutions;