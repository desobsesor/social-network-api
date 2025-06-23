//INFO: ENVIRONMENTAL VARIABLES FOR THE APPLICATION 

import { z } from "zod";

export const envVars = z.object({
  HOST: z.string(),
  PORT: z.string(),
  SECRET: z.string(),
  NODE_ENV: z.string(),
  CLIENT_SOCKET: z.string().url(),
  DB_TYPE: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.string(),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_DATABASE: z.string(),
  JWT_SECRET: z.string(),
  CORS_ORIGINS: z.string(),
});

envVars.parse(process.env);
