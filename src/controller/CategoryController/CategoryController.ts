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

    async readCategoryById(req: Request, res: Response) {

        const {category_id} = req.params

        const categoryService = new CategoryService();

        const category = await categoryService.readCategoryById(category_id);

        if(!category) {
            res.status(404).end();
        }

        return res.json(category);
        
    }

    async updateCategory(req: Request, res: Response) {

        const category_id = req.params.category_id;

        const {name, image} = req.body;

        const categoryService = new CategoryService();

        const category = await categoryService.updateCategory(category_id, {name, image});

        return res.json(category);

    }
    
    async deleteCategory(req: Request, res: Response) {

        const {category_id} = req.params;

        const categoryService = new CategoryService();

        const category = await categoryService.deleteCategory(category_id);

        return res.json(category);

    }
    
}