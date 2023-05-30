import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import { sessionSchema, userSchema } from "../schemas/auth.Schemas.js";


const router = Router();
router.post('/signup', validateSchema(userSchema));
router.post('/signin', validateSchema(sessionSchema))
export default router;