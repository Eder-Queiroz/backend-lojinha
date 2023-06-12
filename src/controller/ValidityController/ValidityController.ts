import { Request, Response } from "express";
import ValidityService from "../../Service/Validity/ValidityService";

export default class ValidityController {
  async createValidity(req: Request, res: Response) {
    const { product_id, amount, validity_date } = req.body;

    const validityService = new ValidityService();

    const validity = await validityService.createValidity({
      product_id,
      amount,
      validity_date,
    });

    return res.json(validity);
  }

  async readValidities(req: Request, res: Response) {
    const validityService = new ValidityService();

    const validity = await validityService.readValidities();

    return res.json(validity);
  }

  async readValidityById(req: Request, res: Response) {
    const { validity_id } = req.params;

    const validityService = new ValidityService();

    const validity = await validityService.readValidityById(validity_id);

    if (!validity) {
      return res.status(404).end();
    }

    return res.json(validity);
  }

  async updateValidity(req: Request, res: Response) {
    const { validity_id } = req.params;

    const { product_id, amount, validity_date } = req.body;

    const validityService = new ValidityService();

    const validity = await validityService.updateValidity(validity_id, {
      product_id,
      amount,
      validity_date,
    });

    return res.json(validity);
  }
  async deleteValidity(req: Request, res: Response) {
    const { validity_id } = req.params;

    const validityService = new ValidityService();

    const validity = await validityService.deleteValidity(validity_id);

    return res.json(validity);
  }

  async filterValidityOfProduct(req: Request, res: Response) {
    const { product_id } = req.params;

    const validityService = new ValidityService();

    const validity = await validityService.filterValidityOfProduct(product_id);

    return res.json(validity);
  }
}
