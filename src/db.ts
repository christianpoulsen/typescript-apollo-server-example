import { ConnectionConfig, createConnection, createPool, PoolConnection } from "mysql";

const dbConfig: ConnectionConfig = {
  host: process.env.RDS_HOSTNAME,
  password: process.env.RDS_PASSWORD,
  port: Number(process.env.RDS_PORT),
  user: process.env.RDS_USERNAME,
};

export const dbPool = createPool(dbConfig);

console.log(process.env.RDS_USERNAME);

export const dbConnection = (query: string) => {
  dbPool.getConnection((err: any, connection: any) => {
    if (err) {
      return console.error(err);
    }

    console.log("CONNECTED!");

    connection.query(query, (error: any, results: any, fields: any) => {
      //  When done with the connection, release it.
      console.log("QUERY DONE");
      connection.release();

      // Handle error after the release.
      if (error) {
        throw error;
      }
    });
  });
};

// dbPool.end();
