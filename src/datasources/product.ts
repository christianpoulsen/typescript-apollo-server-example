import { DataSource, DataSourceConfig } from "apollo-datasource";

interface ProductAPIInterface extends DataSourceConfig<any> {
    store: any;
}

class ProductAPI extends DataSource implements ProductAPIInterface {

    store: any;
    context: any;
    cache: any;

    constructor({ store }: { store: any }) {
        super();
        this.store = store;
    }

    initialize(config: any) {
        this.context = config.context;
    }

    public addNewProduct = (product: any) => {
        return new Promise((resolve: any, reject: any) => {
            console.log("API product", product);
            this.store.products.findOrCreate({ 
                where: {
                    name: product.name,
                },
                defaults: {
                    price: Number(product.price),
                    quantity: product.quantity,
                },
            }).then((res: any) => {
                console.log("API res", res[0].dataValues);
                resolve(res[0].dataValues);
            }).catch((err: any) => {
                reject(err);
            });
        });
    }

    public getAllProducts = () => {
        return new Promise((resolve: any, reject: any) => {
            console.log("API products");
            this.store.products.findAll().then((res: any) => {
                const products = res.map((product: any) => product.dataValues)
                    .map((product: any) => {
                        product.price = Number(product.price);
                        return product;
                    });
                console.log("API products products", products);
                resolve(products);
            }).catch((err: any) => {
                reject(err);
            });
        });
    }

    public getProductById = (id: number) => {
        return new Promise((resolve: any, reject: any) => {
            console.log("API product", id);
            this.store.products.findOne({ where: { id } }).then((res: any) => {
                let product = null;
                if (res && res.dataValues && res.dataValues.price) {
                    product = res.dataValues;
                    product.price = Number(product.price);
                }
                console.log("API product", product);
                resolve(product);
            }).catch((err: any) => {
                reject(err);
            });
        });
    }
}

export default ProductAPI;
