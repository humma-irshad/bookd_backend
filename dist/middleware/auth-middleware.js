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
exports.auth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const prismaClient_1 = require("../util/prismaClient");
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
    if (!token) {
        return res
            .status(401)
            .send({ status: "UNAUTHORIZED", message: "please authenticate" });
    }
    (0, jsonwebtoken_1.verify)(token, process.env.API_ACCESS_TOKEN, (err, username) => __awaiter(void 0, void 0, void 0, function* () {
        if (err || !username)
            return res.sendStatus(403);
        const user = yield prismaClient_1.prismaClient.user.findFirst({
            where: { username: String(username) },
        });
        if (!user)
            return res
                .status(404)
                .send({ status: "NOT FOUND", message: "user not found" });
        req.token = token;
        next();
    }));
});
exports.auth = auth;
