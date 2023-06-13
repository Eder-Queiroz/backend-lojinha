import prismaClient from "../../prisma";

interface ProductRequest {
  name: string;
  cod_barras: string;
  category_id: string;
  price: number;
}

export default class ProductService {
  async createProduct({
    name,
    cod_barras,
    category_id,
    price,
  }: ProductRequest) {
    if (!name || !cod_barras || !category_id) {
      throw new Error("Bad product request");
    }

    // verificando se o cod. barras já está cadastrado
    const getCodBarras = await prismaClient.product.findFirst({
      where: {
        cod_barras,
      },
    });

    if (getCodBarras) {
      throw new Error("Product has already been registered!");
    }

    const product = await prismaClient.product.create({
      data: {
        name,
        cod_barras,
        category_id,
        price,
        isDelete: false,
      },
      select: {
        id: true,
        name: true,
        cod_barras: true,
        category_id: true,
        price: true,
      },
    });

    return product;
  }

  async readProducts() {
    const products = await prismaClient.product.findMany({
      where: {
        isDelete: false,
      },
      select: {
        id: true,
        name: true,
        cod_barras: true,
        category_id: true,
        price: true,
      },
    });

    return products;
  }

  async readProductById(product_id: string) {
    const product = await prismaClient.product.findFirst({
      where: {
        id: product_id,
        isDelete: false,
      },
      select: {
        id: true,
        name: true,
        cod_barras: true,
        category_id: true,
        price: true,
      },
    });

    return product;
  }

  async updateProduct(
    product_id: string,
    { name, cod_barras, category_id, price }: ProductRequest
  ) {
    const product = await prismaClient.product.update({
      data: {
        name,
        cod_barras,
        category_id,
        price,
        updated_at: new Date(),
      },
      where: {
        id: product_id,
      },
      select: {
        id: true,
        name: true,
        cod_barras: true,
        category_id: true,
        price: true,
      },
    });

    return product;
  }

  async deleteProduct(product_id: string) {
    // Deletando o estoque do produto

    await prismaClient.stockProduct.update({
      data: {
        amount: 0,
        isDelete: true,
        deleted_at: new Date(),
      },
      where: {
        product_id: product_id,
      },
    });

    // Deletando validades do produto

    await prismaClient.validity.updateMany({
      data: {
        amount: 0,
        isDelete: true,
        deleted_at: new Date(),
      },
      where: {
        product_id: product_id,
      },
    });

    // Deletando o produto

    const product = await prismaClient.product.update({
      data: {
        isDelete: true,
        deleted_at: new Date(),
      },
      where: {
        id: product_id,
      },
      select: {
        id: true,
        name: true,
        cod_barras: true,
        category_id: true,
        price: true,
      },
    });

    return product;
  }

  async filterProductByCategory(category_id: string) {
    const products = await prismaClient.product.findMany({
      where: {
        category_id,
        isDelete: false,
      },
      select: {
        id: true,
        name: true,
        cod_barras: true,
        category_id: true,
        price: true,
      },
    });

    return products;
  }
}
