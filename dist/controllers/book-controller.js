"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editBook = exports.addBook = exports.getBooks = void 0;
const prismaClient_1 = require("../util/prismaClient");
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield prismaClient_1.prismaClient.book.findMany();
        if (!books.length)
            throw "data not available";
        res.status(200).send({ status: "OK", data: books });
    }
    catch (error) {
        res.status(500).send({ status: "FAILED", error: error });
    }
});
exports.getBooks = getBooks;
const addBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // if (!req.session.isLoggedIn) {
        //   res.status(401).send({
        //     status: "FAILED",
        //     message: "you are not authorized to create a resource",
        //   });
        //   return;
        // }
        if (yield prismaClient_1.prismaClient.book.findFirst({ where: { title: req.body.title } }))
            throw "resource already exists";
        yield prismaClient_1.prismaClient.book.create({
            data: {
                title: req.body.title,
                author: req.body.author,
                coverImage: req.body.coverImage,
            },
        });
        res.status(201).send({
            status: "OK",
            message: "resouce created successfully",
            // isAuthenticated: req.session.isLoggedIn,
        });
    }
    catch (error) {
        res
            .status(400)
            .send({ status: "FAILED", error: error || "could not create resource" });
    }
});
exports.addBook = addBook;
const editBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.params.id;
    try {
        // if (!req.session.isLoggedIn) {
        //   res.status(401).send({
        //     status: "FAILED",
        //     message: "you are not authorized to create a resource",
        //   });
        //   return;
        // }
        yield prismaClient_1.prismaClient.book.update({ where: { id: _id }, data: req.body });
        res.status(204).send({
            status: "OK",
            messgae: "resource updated successfully",
            // isAuthenticated: req.session.isLoggedIn,
        });
    }
    catch (error) {
        res
            .status(400)
            .send({ status: "FAILED", error: "could not update resource" });
    }
});
exports.editBook = editBook;
