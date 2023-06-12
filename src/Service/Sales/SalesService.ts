import prismaClient from "../../prisma";

interface SalesRequest {
  product_id: string;
  amount: number;
}

export default class SalesService {
  async createSale({ product_id, amount }: SalesRequest) {
    if (!product_id || amount < 0) {
      throw new Error("Bad sales request!");
    }

    const sale = await prismaClient.sale.create({
      data: {
        product_id,
        amount,
      },
      select: {
        id: true,
        product_id: true,
        amount: true,
      },
    });

    return sale;
  }

  async readSales() {
    const sales = await prismaClient.sale.findMany({
      select: {
        id: true,
        product_id: true,
        amount: true,
      },
    });

    return sales;
  }

  async readSaleById(sale_id: string) {
    const sale = await prismaClient.sale.findFirst({
      where: {
        id: sale_id,
      },
      select: {
        id: true,
        product_id: true,
        amount: true,
      },
    });

    return sale;
  }

  async updateSale(sale_id: string, { product_id, amount }: SalesRequest) {
    if (amount < 0) {
      throw new Error("Bad sales request!");
    }

    const sale = await prismaClient.sale.update({
      data: {
        product_id,
        amount,
      },
      where: {
        id: sale_id,
      },
      select: {
        id: true,
        product_id: true,
        amount: true,
      },
    });

    return sale;
  }

  async deleteSale(sale_id: string) {
    const sale = await prismaClient.sale.delete({
      where: {
        id: sale_id,
      },
      select: {
        id: true,
        product_id: true,
        amount: true,
      },
    });

    return sale;
  }
}
