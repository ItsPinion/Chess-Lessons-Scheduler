import { createClient, type Client } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import { env } from "~/env";
import * as schema from "./schema";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  client: Client | undefined;
};

export const client =
  globalForDb.client ??
  createClient({
    url: "libsql://chess-itspinion.turso.io",
    authToken:
      "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTk4MjY5MDksImlkIjoiZDNkMDBmOGUtNTViOC00MDdkLWE1MWItMjljMGMxY2I5NGNhIn0.O7kkPK_rLvoWzSw-e08_iXI-wrTlfUUbwtFrB32p8IULaW-U-WcD5O5292OI9EVzBONnAFP2VnBdbKOH0NkGCA",
  });
if (env.NODE_ENV !== "production") globalForDb.client = client;

export const db = drizzle(client, { schema });
