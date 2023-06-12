import {Request, Response} from 'express';
import StockProductService from '../../Service/StockProduct/StockProductService';

export default class StockProductController {

    async createStockProduct(req: Request, res: Response) {

        const {product_id, amount} = req.body;

        const stockProductService = new StockProductService();

        const stockProduct = await stockProductService.createStockProduct({product_id, amount});

        return res.json(stockProduct);

    }

    async readStockProducts(req: Request, res: Response) {

        const stockProductService = new StockProductService();

        const stockProducts = await stockProductService.readStockProducts();

        return res.json(stockProducts);

    }

    async readStockProductById(req: Request, res: Response) {

        const {stockProduct_id} = req.params

        const stockProductService = new StockProductService();

        const stockProducts = await stockProductService.readStockProductById(stockProduct_id);

        if(!stockProducts) {
            return res.status(404).end();
        }

        return res.json(stockProducts);

    }

    async updateStockProduct(req: Request, res: Response) {

        const {stockProduct_id} = req.params;

        const {product_id, amount} = req.body;

        const stockProductService = new StockProductService();

        const stockProducts = await stockProductService.updateStockProduct(stockProduct_id, {product_id, amount});

        return res.json(stockProducts);

    }
    
    async deleteStockProduct(req: Request, res: Response) {

        const {stockProduct_id} = req.params;

        const stockProductService = new StockProductService();

        const stockProducts = await stockProductService.deleteStockProduct(stockProduct_id);

        return res.json(stockProducts);

    }

    async filterStockByProductId(req: Request, res: Response) {

        const {product_id} = req.params;

        const stockProductService = new StockProductService();

        const stockProducts = await stockProductService.filterStockByProductId(product_id);

        return res.json(stockProducts);


    }

}