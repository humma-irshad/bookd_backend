import express from "express";

import {
  loginUser,
  signupUser,
  deleteUser,
} from "../controllers/user-controller";
import { auth } from "../middleware/auth-middleware";

const router = express.Router();

router.post("/user/signup", signupUser);

router.post("/user/login", loginUser);

router.delete("/user/delete", auth, deleteUser);

export { router };
