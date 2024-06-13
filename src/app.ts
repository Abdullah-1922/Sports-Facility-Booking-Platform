import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import { AuthRoute } from "./app/modules/auth/auth.route";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import { NotFound } from "./app/Error/NotFoundError";
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", AuthRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use('*',NotFound)
app.use(globalErrorHandler);
export default app;
