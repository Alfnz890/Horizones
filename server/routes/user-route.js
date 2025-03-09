import { UserController } from "../controller/user-controller.js";
import express from 'express'
import { AuthMiddleware } from "../middleware/auth-middleware.js";

const route = express.Router();

route.get('/api/users', AuthMiddleware, UserController.getAllUsers);
route.post('/api/users', UserController.registration);
route.get('/api/users/:id', AuthMiddleware, UserController.getUserById);
route.patch('/api/users/:id', AuthMiddleware, UserController.updateUser);
route.delete('/api/users/:id', AuthMiddleware, UserController.deleteUser);

export default route;