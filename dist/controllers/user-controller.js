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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.loginUser = exports.signupUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prismaClient_1 = require("../util/prismaClient");
const signupUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prismaClient_1.prismaClient.user.findFirst({
        where: { OR: [{ username: req.body.username }, { email: req.body.email }] },
    });
    if (user) {
        res
            .status(400)
            .send({ status: "FAILED", message: "username or email already taken" });
        return;
    }
    if (req.body.username === "" ||
        req.body.email === "" ||
        req.body.password === "") {
        res.status(400).send({
            status: "FAILED",
            error: "could not create resource",
        });
        return;
    }
    const hashedPassword = bcryptjs_1.default.hashSync(req.body.password, 12);
    yield prismaClient_1.prismaClient.user.create({
        data: {
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        },
    });
    res
        .status(201)
        .send({ status: "OK", messgae: "resource created successfully" });
});
exports.signupUser = signupUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prismaClient_1.prismaClient.user.findFirst({
        where: {
            OR: [{ email: req.body.email }, { username: req.body.username }],
        },
    });
    if (!user) {
        res.status(404).send({ status: "NOT FOUND", error: "user not found" });
        return;
    }
    const isPasswordCorrect = yield bcryptjs_1.default.compare(req.body.password, user.password);
    if (!isPasswordCorrect) {
        res
            .status(401)
            .send({ status: "NOT AUTHORIZED", message: "incorrect password" });
        return;
    }
    req.session.isLoggedIn = true;
    res.status(200).send({ status: "OK", message: "user logged-in", data: user });
});
exports.loginUser = loginUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prismaClient_1.prismaClient.user.delete({ where: { username: "hmmm" } });
        res.status(200).send("done");
    }
    catch (_a) {
        res.status(400).send("errorx");
    }
});
exports.deleteUser = deleteUser;
