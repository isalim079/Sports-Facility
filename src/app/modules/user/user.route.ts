import express from "express";
import validationRequest from "../../middlewares/validationRequest";
import { UserValidation } from "./user.validation";
import { UserControllers } from "./user.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";
const router = express.Router();

router.post(
    "/api/auth/signup",
    validationRequest(UserValidation.userValidationSchema),
    UserControllers.createUser
);
router.get(
    "/api/allUsers",
    auth(USER_ROLE.admin),
    UserControllers.getAllUsersFromDB
);

export const UserRoutes = router;
