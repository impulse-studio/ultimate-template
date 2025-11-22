import { relations } from "drizzle-orm";

import {
    account,
    session,
    user,
    verification,
} from "./auth";

export const userRelations = relations(user, ({ many }) => ({
    accounts: many(account),
    sessions: many(session),
    verifications: many(verification),
}));

export const accountRelations = relations(account, ({ one }) => ({
    user: one(user, {
        fields: [account.userId],
        references: [user.id],
    }),
}));

export const sessionRelations = relations(session, ({ one }) => ({
    user: one(user, {
        fields: [session.userId],
        references: [user.id],
    }),
}));