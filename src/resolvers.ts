/*
Resolvers provide the instructions for turning a GraphQL operation (a query, mutation, or subscription) into data. 
They either return the same type of data we specify in our schema or a promise for that data.

Resolver functions accept four arguments:
fieldName: (parent, args, context, info) => data

- parent:  An object that contains the result returned from the resolver on the parent type
- args:    An object that contains the arguments passed to the field
- context: An object shared by all resolvers in a GraphQL operation.
- info:    Information about the execution state of the operation which should only be used in advanced cases
*/

const Query = {

    product: (_: any, { id }: { id: number }, { dataSources }: { dataSources: any }) => {
        return new Promise((resolve: any, reject: any) => {
            console.log("Query product", id);
            dataSources.productAPI.getProductById(id).then((res: any) => {
                const product = res;
                console.log("Query product", { product });
                if (product) {
                    resolve(product);
                }
            }).catch((err: any) => {
                console.log("Query product failed", err);
                reject(err);
            });
        });
    },

    products: (_: any, __: any, { dataSources }: { dataSources: any }) => {
        return new Promise((resolve: any, reject: any) => {
            console.log("Query products");
            dataSources.productAPI.getAllProducts().then((res: any) => {
                const products = res;
                console.log("Query products", products);
                if (products) {
                    resolve(products);
                }
            }).catch((err: any) => {
                console.log("Query products failed", err);
                reject(err);
            });
        });
    },
};

const Mutation = {
    addProduct: (_: any, productArgs: any, { dataSources }: { dataSources: any }) => {
        return new Promise((resolve: any, reject: any) => {
            let result: any = {
                success: false,
                message: "There already exist a product with that name",
                product: null,
            };
            console.log("Mutation", productArgs);
            dataSources.productAPI.addNewProduct(productArgs).then((res: any) => {
                console.log("Mutation res", res);
                if (res) {
                    result = {
                        success: true,
                        message: `${res.quantity} ${res.name}s added with the price of ${res.price} each.`,
                        product: res,
                    };
                    resolve(result);
                }
            }).catch(() => {
                reject(result);
            });
        });
    },
};

export default { Query, Mutation };
