import express from "express";

import {
  deleteUser,
  loginUser,
  signupUser,
} from "../controllers/user-controller";

const router = express.Router();

router.post("/user/signup", signupUser);

router.post("/user/login", loginUser);

router.delete("/user/delete", deleteUser);

export { router };
