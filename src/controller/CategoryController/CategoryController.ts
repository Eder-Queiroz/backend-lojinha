import { Request, Response } from "express";
import CategoryService from "../../Service/Category/CategoryService";

export default class CategoryController {

    async createCategory(req: Request, res: Response) {

        const {name, image} = req.body

        const categoryService = new CategoryService();

        const category = await categoryService.createCategory({name, image});

        return res.json(category);

    }

    async readCategories(req: Request, res: Response) {

        const categoryService = new CategoryService();

        const categories = await categoryService.readCategories();

        return res.json(categories);
        
    }
    
}