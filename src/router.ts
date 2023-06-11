import { Router, Request, Response } from "express";
import UserController from "./controller/UserController/UserController";
import isAuthenticated from "./middleware/isAuthenticated";
import CategoryController from "./controller/CategoryController/CategoryController";
import isAuthorized from "./middleware/isAuthorized";

const router = Router();

// -- ROUTER USER --
router.post('/signup', new UserController().createUser);
router.post('/signin', new UserController().login);
router.get('/me', isAuthenticated, new UserController().getUserById);

// -- ROUTER CATEGORY --
router.post('/categories', isAuthenticated, isAuthorized, new CategoryController().createCategory);
router.get('/categories', isAuthenticated, new CategoryController().readCategories);
router.put('/categories/:category_id', isAuthenticated, isAuthorized, new CategoryController().updateCategory);

export {router};