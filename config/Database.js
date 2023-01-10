import { Sequelize } from "sequelize";

const db = new Sequelize('pkk', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default db;