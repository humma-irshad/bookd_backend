"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_session_1 = __importDefault(require("express-session"));
const prisma_session_store_1 = require("@quixo3/prisma-session-store");
const prismaClient_1 = require("./util/prismaClient");
const book_route_1 = require("./routes/book-route");
const user_route_1 = require("./routes/user-route");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, express_session_1.default)({
    secret: "demittostrive",
    // session will not be saved on every request (only if something is changed)
    resave: false,
    /* no session is saved for a request where nothing was changed about the
      session */
    saveUninitialized: false,
    store: new prisma_session_store_1.PrismaSessionStore(prismaClient_1.prismaClient, {
        checkPeriod: 2 * 60 * 1000,
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
    }),
}));
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
app.use("/api", book_route_1.router);
app.use("/api", user_route_1.router);
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
