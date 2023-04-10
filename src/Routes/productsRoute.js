import { Router } from "express";
import ProductController from "../Controller/ProductController.js";

const router =Router();
router.route('/products').get(ProductController.getAllProducts);
export default router;