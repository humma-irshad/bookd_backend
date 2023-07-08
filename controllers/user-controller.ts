import { Response } from "express";
import bcrypt from "bcryptjs";

import { TypedRequest } from "../util/extendedTypes";
import { prismaClient } from "../util/prismaClient";
import { getAuthToken } from "../util/getToken";

export const signupUser = async (
  req: TypedRequest<{ username: string; email: string; password: string }>,
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

  const token = await getAuthToken(req.body.username);
  await prismaClient.user.create({
    data: {
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    },
  });

  res
    .status(201)
    .send({ status: "OK", messgae: "resource created successfully", token });
};

export const loginUser = async (
  req: TypedRequest<{
    username: string;
    email: string;
    password: string;
  }>,
  res: Response
) => {
  const user = await prismaClient.user.findFirst({
    where: {
      AND: [{ email: req.body.email }, { username: req.body.username }],
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

  const token = await getAuthToken(req.body.username);

  res
    .status(200)
    .json({ status: "OK", message: "user logged-in", data: { user, token } });
};

export const deleteUser = async (
  req: TypedRequest<{ email: string; password: string }>,
  res: Response
) => {
  const user = await prismaClient.user.findFirst({
    where: { email: req.body.email, password: req.body.password },
  });

  if (!user) {
    res.status(404).send({ status: "FAILED", message: "user not found" });
    return;
  }

  await prismaClient.user.delete({
    where: { email: user.email },
  });
  res
    .status(200)
    .send({ status: "OK", message: "resource deleted successfully" });
};
