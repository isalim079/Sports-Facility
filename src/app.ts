import cors from "cors";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import { UserRoutes } from "./app/modules/user/user.route";

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use("/", UserRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("Sports Facility Booking Platform Server is running correctly..!");
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
