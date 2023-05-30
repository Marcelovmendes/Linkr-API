import express from "express";
import cors from "cors";
import routerList from "./routers/routerList";
import dotenv from "dotenv"
dotenv.config()

const app = express();
app.use(express.json())
app.use(cors())

app.use(routerList);


const { PORT } = process.env;

app.listen(PORT, console.log(`The server is running on port ${PORT}`))