import { Router } from "express";
import ProductController from "../Controller/ProductController.js";
import authenticateToken from "../middlewares/auth.js";

const router =Router();
router.route('/products').get(authenticateToken,ProductController.getAllProducts);
export default router;