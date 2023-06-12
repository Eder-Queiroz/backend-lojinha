import prismaClient from "../../prisma";

interface StockProductRequest {
    product_id: string;
    amount: number;
}

export default class StockProductService {

    async createStockProduct({product_id, amount}: StockProductRequest) {

        if(!product_id || amount < 0) {
            throw new Error('Bad stock product request.');
        }

        const stockProduct = await prismaClient.stockProduct.create({
            data: {
                product_id,
                amount
            },
            select: {
                id: true,
                product_id: true,
                amount: true
            }
        });

        return stockProduct;

    }

    async readStockProducts() {

        const stockProducts = await prismaClient.stockProduct.findMany({
            select: {
                id: true,
                product_id: true,
                amount: true
            }
        });
        
        return stockProducts;

    }

    async readStockProductById(stockProduct_id: string) {

        const stockProduct = await prismaClient.stockProduct.findFirst({
            where: {
                id: stockProduct_id
            },
            select: {
                id: true,
                product_id: true,
                amount: true
            }
        });

        return stockProduct;

    }

    async updateStockProduct(stockProduct_id: string, {product_id, amount}: StockProductRequest) {

        if(!product_id || amount < 0) {
            throw new Error('Bad stock product request.');
        }

        const stockProduct = await prismaClient.stockProduct.update({
            data: {
                product_id,
                amount
            },
            where: {
                id: stockProduct_id
            },
            select: {
                id: true,
                product_id: true,
                amount: true
            }
        });

        return stockProduct;

    }

    async deleteStockProduct(stockProduct_id: string) {

        const stockProduct = await prismaClient.stockProduct.delete({
            where: {
                id: stockProduct_id
            },
            select: {
                id: true,
                product_id: true,
                amount: true
            }
        });

        return stockProduct;

    }

}