import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";

import { RequestWithToken } from "../util/extendedTypes";
import { prismaClient } from "../util/prismaClient";

export const auth = async (
  req: RequestWithToken,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .send({ status: "UNAUTHORIZED", message: "please authenticate" });
  }

  verify(token, process.env.API_ACCESS_TOKEN, async (err, username) => {
    if (err || !username) return res.sendStatus(403);

    const user = await prismaClient.user.findFirst({
      where: { username: String(username) },
    });

    if (!user)
      return res
        .status(404)
        .send({ status: "NOT FOUND", message: "user not found" });

    req.token = token;
    next();
  });
};
