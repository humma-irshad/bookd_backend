import express from "express";

import { addBook, editBook, getBooks } from "../controllers/book-controller";

const router = express.Router();

router.get("/books", getBooks);

router.post("/books", addBook);

router.patch("/books/:id", editBook);

export { router };
