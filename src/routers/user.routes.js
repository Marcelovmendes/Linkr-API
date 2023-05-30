import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import { sessionSchema, userSchema } from "../schemas/auth.Schemas.js";
import { checkUser, cryPass, deCryPass } from "../middlewares/auth.middlewares.js";
import {createSession, postUser} from "../controllers/authControllers.js";


const router = Router();
router.post('/signup', validateSchema(userSchema), checkUser, cryPass, postUser);
router.post('/signin', validateSchema(sessionSchema), checkUser, deCryPass, createSession)
export default router;