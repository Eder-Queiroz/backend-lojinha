import prismaClient from "../../prisma";

export default class BoxService {
  async initBox() {
    const newBox = await prismaClient.box.create({
      data: {
        value: 0.0,
        isDelete: false,
      },
      select: {
        id: true,
        value: true,
      },
    });

    return newBox;
  }

  async readValueBox() {
    const valueBox = await prismaClient.box.findMany({
      where: {
        isDelete: false,
      },
      select: {
        id: true,
        value: true,
      },
    });

    return valueBox;
  }

  async updateValeuBox(value: number, box_id: string) {
    const box = await prismaClient.box.update({
      data: {
        value,
        updated_at: new Date(),
      },
      where: {
        id: box_id,
      },
      select: {
        id: true,
        value: true,
      },
    });

    return box;
  }

  async deleteBox(box_id: string) {
    const box = await prismaClient.box.update({
      data: {
        isDelete: true,
      },
      where: {
        id: box_id,
      },
      select: {
        id: true,
        value: true,
      },
    });

    return box;
  }
}
