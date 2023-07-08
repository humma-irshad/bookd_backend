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
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}

export interface RequestWithToken extends Request {
  token?: string;
}

export interface TypedRequest<T> extends RequestWithToken {
  body: T;
}
