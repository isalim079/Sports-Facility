import express from "express";
import validationRequest from "../../middlewares/validationRequest";
import { FacilityValidation } from "./facility.validation";
import { FacilityControllers } from "./facility.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
const router = express.Router();

router.post(
    "/api/facility",
    auth(USER_ROLE.admin),
    validationRequest(FacilityValidation.facilityValidationSchema),
    FacilityControllers.createFacilityIntoDB
);

router.get('/api/facility', auth(), FacilityControllers.getAllFacilityFromDB)

export const FacilityRoutes = router