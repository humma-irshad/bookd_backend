import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import { router as bookRouter } from "./routes/book-route";
import { router as userRouter } from "./routes/user-route";

const app = express();

app.use(bodyParser.json());

dotenv.config();
const PORT = process.env.PORT || 3000;

app.use("/api", bookRouter);
app.use("/api", userRouter);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
