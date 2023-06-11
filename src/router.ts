import { Router, Request, Response } from "express";
import UserController from "./controller/UserController/UserController";
import isAuthenticated from "./middleware/isAuthenticated";
import CategoryController from "./controller/CategoryController/CategoryController";
import isAuthorized from "./middleware/isAuthorized";
import ProductController from "./controller/ProductController/ProductController";

const router = Router();

// -- ROUTER USER --
router.post('/signup', new UserController().createUser);
router.post('/signin', new UserController().login);
router.get('/me', isAuthenticated, new UserController().getUserById);

// -- ROUTER CATEGORY --
router.post('/categories', isAuthenticated, isAuthorized, new CategoryController().createCategory);
router.get('/categories', isAuthenticated, new CategoryController().readCategories);
router.put('/categories/:category_id', isAuthenticated, isAuthorized, new CategoryController().updateCategory);

// -- ROUTER PRODUCT --
router.post('/products', isAuthenticated, isAuthorized, new ProductController().createProduct);
router.get('/products', isAuthenticated, new ProductController().readProducts);
router.get('/products/:product_id', isAuthenticated, new ProductController().readProductById);
router.put('/products/:product_id', isAuthenticated, isAuthorized, new ProductController().updateProduct);
router.delete('/products/:product_id', isAuthenticated, isAuthorized, new ProductController().deleteProduct);

export {router};