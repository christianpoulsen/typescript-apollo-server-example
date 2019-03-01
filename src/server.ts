// import { ApolloServer } from "apollo-server";
import { Query } from "mysql";
import { dbPool, dbQuery } from "./db";
// import typeDefs from "./schema";

// testing table
let products: Query;
dbQuery(`CREATE TABLE IF NOT EXISTS products (
         ID           INT UNSIGNED  NOT NULL AUTO_INCREMENT,
         name         VARCHAR(30)   NOT NULL DEFAULT '',
         quantity     INT UNSIGNED  NOT NULL DEFAULT 0,
         PRIMARY KEY  (ID)
       );`)
  .then(() =>
    dbQuery(`INSERT INTO products VALUES
           (NULL, 'APPLE',  10),
           (NULL, 'PEAR',   20),
           (NULL, 'ORANGE', 30);`))
  .then(() => {
    dbQuery("SELECT * FROM products;").then((res: any) => {
      products = res;
      console.log("products: ", products);
    });
  }).catch((err: any) => {
    console.error(err);
  });

// const server = new ApolloServer({ typeDefs });

// server.listen().then(({ url }: { url: string }) => {
//   console.log(`🚀 Server ready at ${url}`);
// });

process.on("SIGINT", () => {
  console.log("Got SIGINT. Graceful shutdown start", new Date().toISOString());
  // start graceul shutdown here

  dbQuery("TRUNCATE TABLE products;")
    .then(() => {
      dbPool.end();
      process.exit(0);
    }).catch((err: any) => {
      console.error(err);
    });
});
