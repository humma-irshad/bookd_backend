import { Request, Response } from "express";

import { TypedRequest } from "../util/extendedTypes";
import { prismaClient } from "../util/prismaClient";

export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await prismaClient.book.findMany();

    if (!books.length) throw "data not available";

    res.status(200).send({ status: "OK", data: books });
  } catch (error) {
    res.status(500).send({ status: "FAILED", error: error });
  }
};

export const addBook = async (
  req: TypedRequest<{
    title: string;
    author: string;
    coverImage: string;
    review: string;
  }>,
  res: Response
) => {
  try {
    if (await prismaClient.book.findFirst({ where: { title: req.body.title } }))
      throw "resource already exists";

    await prismaClient.book.create({
      data: {
        title: req.body.title,
        author: req.body.author,
        coverImage: req.body.coverImage,
      },
    });

    res.status(201).send({
      status: "OK",
      message: "resouce created successfully",
    });
  } catch (error) {
    res
      .status(400)
      .send({ status: "FAILED", error: error || "could not create resource" });
  }
};

export const editBook = async (
  req: TypedRequest<{
    title: string;
    author: string;
    coverImage: string;
    review: string;
  }>,
  res: Response
) => {
  const _id = req.params.id;

  try {
    await prismaClient.book.update({ where: { id: _id }, data: req.body });

    res.status(204).send({
      status: "OK",
      messgae: "resource updated successfully",
    });
  } catch (error) {
    res
      .status(400)
      .send({ status: "FAILED", error: "could not update resource" });
  }
};
