import {Request, Response} from 'express';
import ProductService from '../../Service/Product/ProductService';

export default class ProductController {

    async createProduct(req: Request, res: Response) {

        const {name, cod_barras, category_id, price} = req.body;

        const productService = new ProductService();

        const product = await productService.createProduct({name, cod_barras, category_id, price});

        return res.json(product);

    }

    async readProducts(req: Request, res: Response) {

        const productService = new ProductService();

        const products = await productService.readProducts();

        return res.json(products);

    }

    async readProductById(req: Request, res: Response) {

        const {product_id} = req.params;

        const productService = new ProductService();

        const product = await productService.readProductById(product_id);

        if(!product) {
            console.log("Entrei: ", product);
            return res.status(404).end();
        }

        return res.json(product);

    }

    async updateProduct(req: Request, res: Response) {

        const {product_id} = req.params;

        const {name, cod_barras, category_id, price} = req.body;

        const productService = new ProductService();

        const product = await productService.updateProduct(product_id, {name, cod_barras, category_id, price});

        return res.json(product);

    }

    async deleteProduct(req: Request, res: Response) {

        const {product_id} = req.params;

        const productService = new ProductService();

        const product = await productService.deleteProduct(product_id);

        return res.json(product);

    }

    async filterProductByCategory(req: Request, res: Response) {

        const {category_id} = req.params;

        const productService = new ProductService();

        const products = await productService.filterProductByCategory(category_id);

        return res.json(products);

    }

}