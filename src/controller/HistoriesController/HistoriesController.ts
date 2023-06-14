import { Request, Response } from "express";
import HistoriesService from "../../Service/Histories/HistoriesService";

export default class HistoriesController {
  async createHistory(req: Request, res: Response) {
    const { value, box_id, type } = req.body;

    const historiesService = new HistoriesService();

    const newHistory = await historiesService.createHistory({
      value,
      box_id,
      type,
    });

    return res.json(newHistory);
  }

  async readHistory(req: Request, res: Response) {
    const historiesService = new HistoriesService();

    const histories = await historiesService.readHistory();

    return res.json(histories);
  }

  async readHistoryById(req: Request, res: Response) {
    const { history_id } = req.params;

    const historiesService = new HistoriesService();

    const history = await historiesService.readHistoryById(history_id);

    return res.json(history);
  }

  async updateHistory(req: Request, res: Response) {
    const { history_id } = req.params;
    const { value, box_id, type } = req.body;

    const historiesService = new HistoriesService();

    const history = await historiesService.updateHistory(history_id, {
      value,
      box_id,
      type,
    });

    return res.json(history);
  }

  async deleteHistory(req: Request, res: Response) {
    const { history_id } = req.params;

    const historiesService = new HistoriesService();

    const history = await historiesService.deleteHistory(history_id);

    return res.json(history);
  }

  async readHistoryByType(req: Request, res: Response) {
    const { type } = req.body;

    if (!type) {
      throw new Error("Type is required!");
    }

    const historiesService = new HistoriesService();

    const history = await historiesService.filterHistoryByType(type);

    return res.json(history);
  }

  async readHistoryByDate(req: Request, res: Response) {
    const { dateGte, dateLte } = req.body;

    if (!dateGte || !dateLte) {
      throw new Error("Date is required!");
    }

    const historiesService = new HistoriesService();

    const history = await historiesService.filterHistoryByDate({
      dateGte,
      dateLte,
    });

    return res.json(history);
  }
}
