import { ApolloServer } from "apollo-server";
import ProductAPI from "./datasources/product";
import createStore from "./db";
import resolvers from "./resolvers";
import typeDefs from "./schema";

const store = createStore();

const server = new ApolloServer({
  dataSources: () => ({
    productAPI: new ProductAPI({ store }),
  }),
  resolvers,
  typeDefs,
 });

server.listen().then(({ url }: { url: string }) => {
   console.log(`🚀 Server ready at ${url}`);
});

process.on("SIGINT", () => {
  console.log("Got SIGINT. Graceful shutdown start", new Date().toISOString());
  // start graceul shutdown here
  process.exit(0);
});
