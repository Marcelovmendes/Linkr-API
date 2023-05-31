import {Router} from "express";
import { deletePost } from "../controllers/postControllers.js";
import { DeleteValidate } from "../middlewares/post.middleware.js";

const postRouter = Router();

postRouter.delete("/:id",DeleteValidate ,deletePost);


export default postRouter;