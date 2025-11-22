// global.d.ts

import type { OperationKey } from "@orpc/tanstack-query";

interface MutationMeta extends Record<string, unknown> {
    invalidateQueries?: OperationKey[];
}

declare module "@tanstack/react-query" {
    interface Register {
        mutationMeta: MutationMeta;
    }
}
