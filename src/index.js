import express from "express";
import cors from "cors";
import routerList from "./routers/routerList.js";
import dotenv from "dotenv"
dotenv.config()

const app = express();
app.use(express.json())
app.use(cors())

app.use(routerList);

const PORT = process.env.PORT ||  5000
app.listen(PORT, ()=> console.log("Server is running on port " + PORT))