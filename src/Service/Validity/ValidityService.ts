import prismaClient from "../../prisma";

interface ValidityRequest {
  product_id: string;
  amount: number;
  validity_date: Date;
}

export default class ValidityService {
  async createValidity({ product_id, amount, validity_date }: ValidityRequest) {
    if (!product_id || amount < 0) {
      throw new Error("Bad validity request!");
    }

    const validity = await prismaClient.validity.create({
      data: {
        product_id,
        amount,
        validity_date,
        isDelete: false
      },
      select: {
        id: true,
        product_id: true,
        amount: true,
        validity_date: true,
      },
    });

    return validity;
  }

  async readValidities() {
    const validities = await prismaClient.validity.findMany({
      where: {
        isDelete: false
      },
      select: {
        id: true,
        product_id: true,
        amount: true,
        validity_date: true,
      },
    });

    return validities;
  }

  async readValidityById(validity_id: string) {
    const validity = await prismaClient.validity.findFirst({
      where: {
        id: validity_id,
        isDelete: false
      },
      select: {
        id: true,
        product_id: true,
        amount: true,
        validity_date: true,
      },
    });

    return validity;
  }

  async updateValidity(
    validity_id: string,
    { product_id, amount, validity_date }: ValidityRequest
  ) {
    if (amount < 0) {
      throw new Error("Bad validity request!");
    }

    const validity = await prismaClient.validity.update({
      data: {
        product_id,
        amount,
        validity_date,
      },
      where: {
        id: validity_id,
      },
      select: {
        id: true,
        product_id: true,
        amount: true,
        validity_date: true,
      },
    });

    return validity;
  }

  async deleteValidity(validity_id: string) {
    const validity = await prismaClient.validity.delete({
      where: {
        id: validity_id,
      },
      select: {
        id: true,
        product_id: true,
        amount: true,
        validity_date: true,
      },
    });

    return validity;
  }
}
