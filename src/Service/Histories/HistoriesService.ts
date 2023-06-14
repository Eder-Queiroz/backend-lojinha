import prismaClient from "../../prisma";

interface HistoriesRequest {
  value: number;
  box_id: string;
  type: string;
}

interface DateFilter {
  dateGte: Date;
  dateLte: Date;
}

export default class HistoriesService {
  async createHistory({ value, box_id, type }: HistoriesRequest) {
    if (!type) {
      throw new Error("Type is required!");
    }

    const newHistory = await prismaClient.history.create({
      data: {
        value,
        box_id,
        type,
        isDelete: false,
      },
      select: {
        id: true,
        value: true,
        box_id: true,
        type: true,
        created_at: true,
      },
    });

    return newHistory;
  }

  async readHistory() {
    const histories = await prismaClient.history.findMany({
      where: {
        isDelete: false,
      },
      select: {
        id: true,
        value: true,
        box_id: true,
        type: true,
        created_at: true,
      },
    });

    return histories;
  }

  async readHistoryById(history_id: string) {
    const history = await prismaClient.history.findFirst({
      where: {
        id: history_id,
        isDelete: false,
      },
      select: {
        id: true,
        value: true,
        box_id: true,
        type: true,
        created_at: true,
      },
    });

    return history;
  }

  async updateHistory(
    history_id: string,
    { value, box_id, type }: HistoriesRequest
  ) {
    const history = await prismaClient.history.update({
      data: {
        value,
        box_id,
        type,
        updated_at: new Date(),
      },
      where: {
        id: history_id,
      },
      select: {
        id: true,
        value: true,
        box_id: true,
        type: true,
        created_at: true,
      },
    });

    return history;
  }

  async deleteHistory(history_id: string) {
    const history = await prismaClient.history.update({
      data: {
        isDelete: true,
      },
      where: {
        id: history_id,
      },
      select: {
        id: true,
        value: true,
        box_id: true,
        type: true,
        created_at: true,
      },
    });

    return history;
  }

  async filterHistoryByType(type: string) {
    const histories = await prismaClient.history.findMany({
      where: {
        type,
        isDelete: false,
      },
      select: {
        id: true,
        value: true,
        box_id: true,
        type: true,
        created_at: true,
      },
    });

    return histories;
  }

  async filterHistoryByDate({ dateGte, dateLte }: DateFilter) {
    const histories = await prismaClient.history.findMany({
      where: {
        created_at: {
          gte: dateGte,
          lte: dateLte,
        },
        isDelete: false,
      },
      select: {
        id: true,
        value: true,
        box_id: true,
        type: true,
        created_at: true,
      },
    });

    return histories;
  }
}
