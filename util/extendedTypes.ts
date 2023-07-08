import { z } from "zod";
import { Request } from "express";

const envVariables = z.object({
  NODE_ENV: z.string(),
  PORT: z.string(),
  API_ACCESS_TOKEN: z.string(),
  DATABASE_URL: z.string(),
});

envVariables.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}

export interface TypedRequest<T> extends Request {
  body: T;
  token?: string;
}
