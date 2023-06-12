import { Router, Request, Response } from "express";
import UserController from "./controller/UserController/UserController";
import isAuthenticated from "./middleware/isAuthenticated";
import CategoryController from "./controller/CategoryController/CategoryController";
import isAuthorized from "./middleware/isAuthorized";
import ProductController from "./controller/ProductController/ProductController";
import StockProductController from "./controller/StockProductController/StockProductController";
import SalesController from "./controller/SalesController/SalesController";
import ValidityController from "./controller/ValidityController/ValidityController";

const router = Router();

// -- ROUTER USER --
router.post("/signup", new UserController().createUser);
router.post("/signin", new UserController().login);
router.get("/me", isAuthenticated, new UserController().getUserById);

// -- ROUTER CATEGORY --
router.post(
  "/categories",
  isAuthenticated,
  isAuthorized,
  new CategoryController().createCategory
);
router.get(
  "/categories",
  isAuthenticated,
  new CategoryController().readCategories
);
router.put(
  "/categories/:category_id",
  isAuthenticated,
  isAuthorized,
  new CategoryController().updateCategory
);

// -- ROUTER PRODUCT --
router.post(
  "/products",
  isAuthenticated,
  isAuthorized,
  new ProductController().createProduct
);
router.get("/products", isAuthenticated, new ProductController().readProducts);
router.get(
  "/products/:product_id",
  isAuthenticated,
  new ProductController().readProductById
);
router.put(
  "/products/:product_id",
  isAuthenticated,
  isAuthorized,
  new ProductController().updateProduct
);
router.delete(
  "/products/:product_id",
  isAuthenticated,
  isAuthorized,
  new ProductController().deleteProduct
);

// -- ROUTER STOCKPRODUCT --
router.post(
  "/stock-product",
  isAuthenticated,
  isAuthorized,
  new StockProductController().createStockProduct
);
router.get(
  "/stock-product",
  isAuthenticated,
  new StockProductController().readStockProducts
);
router.get(
  "/stock-product/:stockProduct_id",
  isAuthenticated,
  new StockProductController().readStockProductById
);
router.put(
  "/stock-product/:stockProduct_id",
  isAuthenticated,
  isAuthorized,
  new StockProductController().updateStockProduct
);
router.delete(
  "/stock-product/:stockProduct_id",
  isAuthenticated,
  new StockProductController().deleteStockProduct
);

// -- ROUTER SALES --
router.post(
  "/sales",
  isAuthenticated,
  isAuthorized,
  new SalesController().createSale
);
router.get("/sales", isAuthenticated, new SalesController().readSales);
router.get(
  "/sales/:sale_id",
  isAuthenticated,
  new SalesController().readSaleById
);
router.put(
  "/sales/:sale_id",
  isAuthenticated,
  isAuthorized,
  new SalesController().updateSale
);
router.delete(
  "/sales/:sale_id",
  isAuthenticated,
  isAuthorized,
  new SalesController().deleteSale
);

// -- ROUTER SALES --
router.post(
  "/validity",
  isAuthenticated,
  isAuthorized,
  new ValidityController().createValidity
);

router.get(
  "/validity",
  isAuthenticated,
  new ValidityController().readValidities
);
router.get(
  "/validity/:validity_id",
  isAuthenticated,
  new ValidityController().readValidityById
);
router.put(
  "/validity/:validity_id",
  isAuthenticated,
  isAuthorized,
  new ValidityController().updateValidity
);
router.delete(
  "/validity/:validity_id",
  isAuthenticated,
  isAuthorized,
  new ValidityController().deleteValidity
);

export { router };
