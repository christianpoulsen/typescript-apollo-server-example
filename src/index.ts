import { ApolloServer } from "apollo-server";
import typeDefs from "./schema";

const server = new ApolloServer({ typeDefs });

server.listen().then(({ url }: { url: string }) => {
  console.log(`🚀 Server ready at ${url}`);
});
