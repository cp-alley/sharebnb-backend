/** Express app for ShareBnB */

import express from "express";
import {usersRoutes} from "./routes/users";
import { NotFoundError } from "./expressError";

const app = express();

app.use(express.json());

app.use("/users", usersRoutes)

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  throw new NotFoundError();
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  /* istanbul ignore next (ignore for coverage) */
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

export default app;