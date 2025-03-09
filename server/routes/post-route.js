import { PostController } from "../controller/post-controller.js"
import express from 'express'
import { AuthMiddleware } from "../middleware/auth-middleware.js";

const route = express.Router();

route.get('/api/posts', PostController.getAllPosts);
route.post('/api/posts', AuthMiddleware, PostController.createPost);
route.get('/api/posts/:slug', PostController.getPostBySlug);
route.patch('/api/posts/:slug', AuthMiddleware, PostController.updatePost);

export default route;