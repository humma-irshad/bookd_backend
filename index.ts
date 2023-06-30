import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import session, { SessionData } from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";

import { prismaClient } from "./util/prismaClient";

import { router as bookRouter } from "./routes/book-route";
import { router as userRouter } from "./routes/user-route";
import { PrismaClient } from "@prisma/client";

declare module "express-session" {
  export interface SessionData {
    isLoggedIn: boolean;
  }
}

const app = express();

app.use(bodyParser.json());
app.use(
  session({
    secret: "demittostrive",
    // session will not be saved on every request (only if something is changed)
    resave: false,
    /* no session is saved for a request where nothing was changed about the
      session */
    saveUninitialized: false,
    store: new PrismaSessionStore<SessionData>(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  }) 
);

dotenv.config();
const PORT = process.env.PORT || 3000;

app.use("/api", bookRouter);
app.use("/api", userRouter);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
