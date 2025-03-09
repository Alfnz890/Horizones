import { AuthController } from "../controller/auth-controller.js";
import express from 'express'

const route = express.Router();

route.post('/api/users/login', AuthController.login);
route.post('/api/users/logout', AuthController.logout);

export default route