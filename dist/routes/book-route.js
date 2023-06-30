"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("../controllers/book-controller");
const router = express_1.default.Router();
exports.router = router;
router.get("/books", book_controller_1.getBooks);
router.post("/books", book_controller_1.addBook);
router.patch("/books/:id", book_controller_1.editBook);
