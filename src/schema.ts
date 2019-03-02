import { gql } from "apollo-server";

const typeDefs = gql`

    # The Query type is the entry point into our schema that describes what data we can fetch.
    type Query {
        products: [Product]!
        product(id: ID!): Product
    }

    # The Mutation type is the entry point into our graph for modifying data.
    type Mutation {
        addProduct(name: String, price: Float, quantity: Int): ProductCatalogueUpdateResponse!
    }

    # Both the Query and the Mutation type are special object types.

    # This is a normal object type.
    type Product {
        id: ID!
        name: String
        price: Float
        quantity: Int
    }

    # Our mutation response type contains a success status, a corresponding message, and the launch that we updated.
    type ProductCatalogueUpdateResponse {
        success: Boolean!
        message: String
        product: Product
    }
`;

export default typeDefs;
