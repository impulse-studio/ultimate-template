import { createEnv } from "@t3-oss/env-nextjs";
import {
  clientVariables,
  serverVariables,
  type ClientEnv,
  type ServerEnv,
} from "./variables";

type Env = ServerEnv & ClientEnv;
type RuntimeEnv = Record<keyof ClientEnv, string | undefined>;

const runtimeEnv = Object.keys(clientVariables).reduce<RuntimeEnv>(
  (record, key) => {
    const currentKey = key as keyof ClientEnv;
    record[currentKey] = process.env[currentKey] ?? undefined;
    return record;
  },
  {} as RuntimeEnv,
);

export const env: Env = createEnv({
  server: serverVariables,
  client: clientVariables,
  experimental__runtimeEnv: runtimeEnv,
  onValidationError: (issues) => {
    throw new Error(`Invalid environment variables: ${JSON.stringify(issues)}`);
  },
});
