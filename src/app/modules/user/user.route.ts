import express from "express";
import validationRequest from "../../middlewares/validationRequest";
import { UserValidation } from "./user.validation";
import { UserControllers } from "./user.controller";
const router = express.Router();

router.post(
    "/api/auth/signup",
    validationRequest(UserValidation.userValidationSchema),
    UserControllers.createUser
);

export const UserRoutes = router;
