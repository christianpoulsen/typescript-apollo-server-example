import { ConnectionConfig, createPool, MysqlError, Pool, PoolConnection, Query } from "mysql";

const dbConfig: ConnectionConfig = {
  database: "testDB",
  host: process.env.RDS_HOSTNAME,
  password: process.env.RDS_PASSWORD,
  port: Number(process.env.RDS_PORT),
  user: process.env.RDS_USERNAME,
};

export const dbPool: Pool = createPool(dbConfig);

export const dbQuery = async (query: string) => {
  return new Promise((resolve: any, reject: any) => {
    dbPool.getConnection((err: MysqlError, connection: PoolConnection) => {
      if (err) {
        throw reject(err);
      }
      connection.query(query, (error: MysqlError, results: Query, fields: Query) => {
        connection.release();
        if (error) {
          throw reject(error);
        }
        resolve(results);
      });
    });
  });
};
