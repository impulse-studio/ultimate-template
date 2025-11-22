import { base } from "../context";
import { exampleRouter } from "./example/router";

export const appRouter = base.router({
  example: exampleRouter,
});
