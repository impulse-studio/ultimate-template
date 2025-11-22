import Redis from "ioredis";
import { env } from "@repo/env";

export const redis = new Redis(`${env.REDIS_URL}?family=0`);
