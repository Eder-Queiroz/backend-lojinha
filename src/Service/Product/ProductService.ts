import prismaClient from "../../prisma";

interface ProductRequest {
    name: string;
    cod_barras: string;
    category_id: string;
    price: number;
}

export default class ProductService {

    async createProduct({name, cod_barras, category_id, price}: ProductRequest) {

        if(!name || !cod_barras || !category_id) {
            throw new Error('Bad product request');
        }

        // verificando se o cod. barras já está cadastrado
        const getCodBarras = await prismaClient.product.findFirst({
            where: {
                cod_barras
            }
        });

        if(getCodBarras) {
            throw new Error('Product has already been registered!');
        }

        const product = await prismaClient.product.create({
            data: {
                name,
                cod_barras,
                category_id,
                price
            },
            select: {
                id: true,
                name: true,
                cod_barras: true,
                category_id: true,
                price: true
            }
        });

        return product;

    }

    async readProducts() {

        const products = await prismaClient.product.findMany({
            select: {
                id: true,
                name: true,
                cod_barras: true,
                category_id: true,
                price: true
            }
        });

        return products;

    }

    async readProductById(product_id: string) {

        const product = await prismaClient.product.findFirst({
            where: {
                id: product_id
            },
            select: {
                id: true,
                name: true,
                cod_barras: true,
                category_id: true,
                price: true
            }
        });

        return product;

    }

    async updateProduct(product_id: string, {name, cod_barras, category_id, price}:ProductRequest) {

        const product = await prismaClient.product.update({
            data: {
                name,
                cod_barras,
                category_id,
                price
            },
            where: {
                id: product_id
            },
            select: {
                id: true,
                name: true,
                cod_barras: true,
                category_id: true,
                price: true
            }
        });

        return product;

    }

    async deleteProduct(product_id: string) {

        const product = await prismaClient.product.delete({
            where: {
                id: product_id
            },
            select: {
                id: true,
                name: true,
                cod_barras: true,
                category_id: true,
                price: true
            }
        });

        return product;

    }

}