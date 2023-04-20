import AuthController from "../Controller/AuthController.js";
import { Router } from "express";
const router = Router();
router.route('/register').post(AuthController.register);
router.route('/login').post(AuthController.login);
router.route('/auth/getToken').post(AuthController.getAccesToken);
router.route('/logout').post(AuthController.logout);

export default router;