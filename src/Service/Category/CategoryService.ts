import prismaClient from "../../prisma";

interface CategoryRequest {
  name: string;
  image?: string;
}

export default class CategoryService {
  async createCategory({ name, image }: CategoryRequest) {
    if (!name) {
      throw new Error("Name category invalid!");
    }

    const category = await prismaClient.category.create({
      data: {
        name,
        image,
        isDelete: false,
      },
      select: {
        id: true,
        name: true,
        image: true,
      },
    });

    return category;
  }

  async readCategories() {
    const categories = await prismaClient.category.findMany({
      where: {
        isDelete: false,
      },
      select: {
        id: true,
        name: true,
        image: true,
      },
    });

    return categories;
  }

  async readCategoryById(category_id: string) {
    const category = await prismaClient.category.findFirst({
      where: {
        id: category_id,
        isDelete: false,
      },
      select: {
        id: true,
        name: true,
        image: true,
      },
    });

    return category;
  }

  async updateCategory(category_id: string, { name, image }: CategoryRequest) {
    const category = await prismaClient.category.update({
      data: {
        name,
        image,
        updated_at: new Date(),
      },
      where: {
        id: category_id,
      },
      select: {
        id: true,
        name: true,
        image: true,
      },
    });

    return category;
  }

  async deleteCategory(category_id: string) {
    // deletando produtos

    await prismaClient.product.updateMany({
      data: {
        isDelete: true,
        deleted_at: new Date(),
      },
      where: {
        category_id: category_id,
      },
    });

    // deletando a categoria

    const category = await prismaClient.category.update({
      data: {
        isDelete: true,
        deleted_at: new Date(),
      },
      where: {
        id: category_id,
      },
    });

    return category;
  }
}
