import { RequestHandler } from "express";
import { userServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

const createUser: RequestHandler = async (req, res, next) => {
    try {
        const userData = req.body
        const result = await userServices.createUserIntoDB(userData)

        sendResponse (res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'User registered successfully',
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const getAllUsersFromDB = catchAsync(async (req, res) => {
    const result = await userServices.getAllUsersFromDB();
    if (result.length === 0) {
        sendResponse(res, {
            statusCode: httpStatus.NOT_FOUND,
            success: false,
            message: "No user Found",
            data: result,
        });
    }
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All users retrieved successfully",
        data: result,
    });
});

export const UserControllers = {
    createUser,
    getAllUsersFromDB,
}