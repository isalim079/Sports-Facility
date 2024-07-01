import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { FacilityServices } from "./facility.service";

const createFacilityIntoDB = catchAsync(async (req, res) => {
    const result = await FacilityServices.createFacilityIntoDB(req.body);

    // modified
    const formattedResult = {
        _id: result._id,
        name: result.name,
        description: result.description,
        pricePerHour: result.pricePerHour,
        location: result.location,
        isDeleted: result.isDeleted
    }

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Facility added successfully",
        data: formattedResult,
    });
});

const getAllFacilityFromDB = catchAsync(async (req, res) => {
    const result = await FacilityServices.getAllFacilityFromDB();
    if (result.length === 0) {
        sendResponse(res, {
            statusCode: httpStatus.NOT_FOUND,
            success: false,
            message: "No Data Found",
            data: result,
        });
    }
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Facilities retrieved successfully",
        data: result,
    });
});

const updateFacilityFromDB = catchAsync(async (req, res) => {
    const { id } = req.params;
    const updateInfo = req.body;
    const result = await FacilityServices.updateFacilityIntoDB(id, updateInfo);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Facility updated successfully",
        data: result,
    });
});

const deleteFacilityFromDB = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await FacilityServices.deleteFacilityFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Facility deleted successfully",
        data: result,
    });
});

export const FacilityControllers = {
    createFacilityIntoDB,
    getAllFacilityFromDB,
    updateFacilityFromDB,
    deleteFacilityFromDB,
};
