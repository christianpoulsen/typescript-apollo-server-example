import { ConnectionConfig, createConnection } from "mysql";

const dbConfig: ConnectionConfig = {
  host     : process.env.RDS_HOSTNAME,
  password : process.env.RDS_PASSWORD,
  port     : Number(process.env.RDS_PORT),
  user     : process.env.RDS_USERNAME,
};

const connection = createConnection(dbConfig);

connection.connect((err: any) => {
  if (err) {
    // console.error("Database connection failed: " + err.stack);
    return;
  }
  // console.log("Connected to database.");
});

connection.end();
