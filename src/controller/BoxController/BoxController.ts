import { Request, Response } from "express";
import BoxService from "../../Service/Box/BoxService";

export default class BoxController {
  async initBox(req: Request, res: Response) {
    const boxService = new BoxService();

    const newBox = await boxService.initBox();

    return res.json(newBox);
  }

  async readValueBox(req: Request, res: Response) {
    const boxService = new BoxService();

    const box = await boxService.readValueBox();

    return res.json(box);
  }

  async updateValueBox(req: Request, res: Response) {
    const { box_id } = req.params;

    const { value } = req.body;

    const boxService = new BoxService();

    const box = await boxService.updateValeuBox(value, box_id);

    return res.json(box);
  }

  async deleteBox(req: Request, res: Response) {
    const { box_id } = req.params;

    const boxService = new BoxService();

    const box = await boxService.deleteBox(box_id);

    return res.json(box);
  }
}
