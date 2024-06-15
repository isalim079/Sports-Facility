import { RequestHandler } from "express";
import { userServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

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

export const UserControllers = {
    createUser
}