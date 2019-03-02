import SQL from "sequelize";

const createStore = () => {
    const Op = SQL.Op;
    const operatorsAliases = {};

    const db = new SQL(
        "testDB",
        process.env.RDS_USERNAME,
        process.env.RDS_PASSWORD,
        {
            dialect: "mysql",
            host: process.env.RDS_HOSTNAME,
            logging: false,
            operatorsAliases,
            port: Number(process.env.RDS_PORT),
        },
    );

    db.authenticate()
        .then(() => {
            console.log("Connection has been established successfully.");
        })
        .catch((err: SQL.ConnectionError) => {
            console.error("Unable to connect to the database:", err);
        });

    const products = db.define("product", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: SQL.INTEGER,
        },
        name: SQL.STRING,
        price: SQL.DECIMAL,
        quantity: SQL.INTEGER,
    }, {
            createdAt: false,
            updatedAt: false,
        });

    return { products };
};

export default createStore;
