import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { FacilityServices } from "./facility.service";

const createFacilityIntoDB = catchAsync(async (req, res) => {
    const result = await FacilityServices.createFacilityIntoDB(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Facility added successfully",
        data: result
    })
})

const getAllFacilityFromDB = catchAsync(async(req, res) => {

    // console.log('test', req.user);   

    const result = await FacilityServices.getAllFacilityFromDB()
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Facilities retrieved successfully",
        data: result
    })
})

const updateFacilityFromDB = catchAsync(async (req, res) => {
    const {id} = req.params
    const updateInfo = req.body;
    const result = await FacilityServices.updateProductIntoDB(id, updateInfo)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Facility updated successfully",
        data: result
    })
})

export const FacilityControllers = {
    createFacilityIntoDB,
    getAllFacilityFromDB,
    updateFacilityFromDB
}