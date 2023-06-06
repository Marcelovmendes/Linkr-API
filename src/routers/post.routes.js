import {Router} from "express";
import { createPost, deletePost, getPosts } from "../controllers/postControllers.js";
import { DeleteValidate } from "../middlewares/post.middleware.js";

const postRouter = Router();

postRouter.delete("/:id",DeleteValidate ,deletePost);
postRouter.post("/",createPost);
postRouter.get("/timeline",getPosts);

export default postRouter;