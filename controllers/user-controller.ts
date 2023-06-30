import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import { prismaClient } from "../util/prismaClient";

export interface TypedRequestBody<T> extends Request {
  body: T;
}

export const signupUser = async (
  req: TypedRequestBody<{ username: string; email: string; password: string }>,
  res: Response
) => {
  const user = await prismaClient.user.findFirst({
    where: { OR: [{ username: req.body.username }, { email: req.body.email }] },
  });

  if (user) {
    res
      .status(400)
      .send({ status: "FAILED", message: "username or email already taken" });
    return;
  }

  if (
    req.body.username === "" ||
    req.body.email === "" ||
    req.body.password === ""
  ) {
    res.status(400).send({
      status: "FAILED",
      error: "could not create resource",
    });
    return;
  }

  const hashedPassword = bcrypt.hashSync(req.body.password, 12);

  await prismaClient.user.create({
    data: {
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    },
  });

  res
    .status(201)
    .send({ status: "OK", messgae: "resource created successfully" });
};

export const loginUser = async (
  req: TypedRequestBody<{
    username: string;
    email: string;
    password: string;
  }>,
  res: Response
) => {
  const user = await prismaClient.user.findFirst({
    where: {
      OR: [{ email: req.body.email }, { username: req.body.username }],
    },
  });

  if (!user) {
    res.status(404).send({ status: "NOT FOUND", error: "user not found" });
    return;
  }

  const isPasswordCorrect = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!isPasswordCorrect) {
    res
      .status(401)
      .send({ status: "NOT AUTHORIZED", message: "incorrect password" });
    return;
  }

  req.session.isLoggedIn = true;
  res.status(200).send({ status: "OK", message: "user logged-in", data: user });
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await prismaClient.user.delete({ where: { username: "hmmm" } });

    res.status(200).send("done");
  } catch {
    res.status(400).send("errorx");
  }
};
