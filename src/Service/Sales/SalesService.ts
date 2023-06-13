import prismaClient from "../../prisma";

interface SalesRequest {
  product_id: string;
  amount: number;
}

interface DateFilter {
  dateGte: Date;
  dateLte: Date;
}
export default class SalesService {
  async createSale({ product_id, amount }: SalesRequest) {
    if (!product_id) {
      throw new Error("Bad sales request!");
    }

    const sale = await prismaClient.sale.create({
      data: {
        product_id,
        amount,
        isDelete: false,
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
      where: {
        isDelete: false,
      },
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
        isDelete: false,
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
    const sale = await prismaClient.sale.update({
      data: {
        product_id,
        amount,
        updated_at: new Date(),
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
    const sale = await prismaClient.sale.update({
      data: {
        isDelete: true,
        deleted_at: new Date(),
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

  async filterSaleOfProduct(product_id: string) {
    const sales = await prismaClient.sale.findMany({
      where: {
        product_id,
        isDelete: false,
      },
      select: {
        id: true,
        product_id: true,
        amount: true,
      },
    });

    return sales;
  }

  async filterSaleByDate({ dateGte, dateLte }: DateFilter) {
    const sales = await prismaClient.sale.findMany({
      where: {
        created_at: {
          gte: dateGte,
          lte: dateLte,
        },
      },
      select: {
        id: true,
        product_id: true,
        amount: true,
      },
    });

    return sales;
  }
}
