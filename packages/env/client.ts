import { clientEnvSchema } from "./variables";

export const clientEnv = clientEnvSchema.parse({
  NEXT_PUBLIC_REACT_QUERY_DEVTOOLS:
    process.env.NEXT_PUBLIC_REACT_QUERY_DEVTOOLS,
});
