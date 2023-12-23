import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import cors from "cors";
import { taskRouter } from "./routes/task.route";
import * as bp from "body-parser";
import { validateTaskCreate, validateTaskUpdate } from "./validators/task.validator";

config();

const app = express();
const port = process.env.PORT || 4200;
app.use(morgan("dev"));
app.use(bp.json());
app.use(cors({
  origin: "*",
}))
app.use("/tasks", validateTaskCreate, validateTaskUpdate, taskRouter);

app.listen(port, () => console.log(`app started on port:${port} 🤘`))
