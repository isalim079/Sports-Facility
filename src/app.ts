import cors from "cors";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import { UserRoutes } from "./app/modules/user/user.route";
import { AuthRoutes } from "./app/modules/Auth/auth.route";
import { FacilityRoutes } from "./app/modules/facility/facility.route";
import { BookingRoutes } from "./app/modules/booking/booking.route";

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use("/", UserRoutes);
app.use("/", AuthRoutes);
app.use("/", FacilityRoutes)
app.use('/', BookingRoutes)

app.get("/", (req: Request, res: Response) => {
    res.send("Sports Facility Booking Platform Server is running correctly..!");
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
