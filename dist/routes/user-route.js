"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user-controller");
const router = express_1.default.Router();
exports.router = router;
router.post("/user/signup", user_controller_1.signupUser);
router.post("/user/login", user_controller_1.loginUser);
router.delete("/user/delete", user_controller_1.deleteUser);
