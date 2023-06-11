import prismaClient from "../../prisma";

interface CategoryRequest {
    name: string,
    image?: string
}

export default class CategoryService {

    async createCategory({name, image}: CategoryRequest) {

        if(!name) {
            throw new Error('Name category invalid!');
        }

        const category = await prismaClient.category.create({
            data: {
                name,
                image
            },
            select: {
                id: true,
                name: true,
                image: true
            }
        })

        return category;

    }

    async readCategories() {

        const categories = await prismaClient.category.findMany({
            select: {
                id: true,
                name: true,
                image: true
            }
        })

        return categories

    }

    async updateCategory(category_id: string, {name, image}:CategoryRequest) {

        const category = await prismaClient.category.update({
            data: {
                name,
                image
            },
            where: {
                id: category_id
            },
            select: {
                id: true,
                name: true,
                image: true
            }
        });


        return category;

    }

    // TODO implementar o delete de categoria

}