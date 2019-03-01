import { ApolloServer } from "apollo-server";
import { dbConnection } from "./db";
import typeDefs from "./schema";

dbConnection("CREATE DATABASE IF NOT EXISTS testDB");

// const server = new ApolloServer({ typeDefs });

// server.listen().then(({ url }: { url: string }) => {
//   console.log(`🚀 Server ready at ${url}`);
// });
