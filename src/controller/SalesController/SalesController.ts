import { Request, Response } from "express";
import SalesService from "../../Service/Sales/SalesService";

export default class SalesController {
  async createSale(req: Request, res: Response) {
    const { product_id, amount } = req.body;

    const salesService = new SalesService();

    const sale = await salesService.createSale({ product_id, amount });

    return res.json(sale);
  }

  async readSales(req: Request, res: Response) {
    const salesService = new SalesService();

    const sales = await salesService.readSales();

    return res.json(sales);
  }

  async readSaleById(req: Request, res: Response) {
    const { sale_id } = req.params;

    const salesService = new SalesService();

    const sale = await salesService.readSaleById(sale_id);

    if (!sale) {
      return res.status(404).end();
    }

    return res.json(sale);
  }

  async updateSale(req: Request, res: Response) {
    const { sale_id } = req.params;

    const { product_id, amount } = req.body;

    const salesService = new SalesService();

    const sale = await salesService.updateSale(sale_id, {
      product_id,
      amount,
    });

    return res.json(sale);
  }

  async deleteSale(req: Request, res: Response) {
    const { sale_id } = req.params;

    const salesService = new SalesService();

    const sale = await salesService.deleteSale(sale_id);

    return res.json(sale);
  }

  async filterSaleOfProduct(req: Request, res: Response) {
    const { product_id } = req.params;

    const salesService = new SalesService();

    const sale = await salesService.filterSaleOfProduct(product_id);

    return res.json(sale);
  }

  async filterSalesOfDate(req: Request, res: Response) {
    const {dateGte, dateLte} = req.body;

    const salesService = new SalesService();

    const sales = await salesService.filterSaleByDate({dateGte, dateLte});

    return res.json(sales);

  }

}
