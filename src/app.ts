import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import { AuthRoute } from "./app/modules/auth/auth.route";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import { NotFound } from "./app/Error/NotFoundError";
import { FacultyRoute} from "./app/modules/faculty/faculty.route";
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", AuthRoute);
app.use("/api/faculty",FacultyRoute)

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use('*',NotFound)
app.use(globalErrorHandler);
export default app;
