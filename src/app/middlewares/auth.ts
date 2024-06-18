import { NextFunction, Request, Response } from "express";

import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../config";
import { TUserRole } from "../modules/user/user.interface";



const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            const token = req.headers.authorization;

            if (!token) {
                throw new AppError(
                    httpStatus.UNAUTHORIZED,
                    "You have no access to this route"
                );
            }

            // check if the token is valid
            jwt.verify(token, config.jwt_access_secret as string, function(err, decoded) {
                if(err) {
                    throw new AppError(
                        httpStatus.UNAUTHORIZED,
                        "You have no access to this route"
                    );
                }

                const role = (decoded as JwtPayload).role

                if(requiredRoles && !requiredRoles.includes(role)) {
                    throw new AppError(
                        httpStatus.UNAUTHORIZED,
                        "You have no access to this route"
                    );
                }
                
                req.user = decoded as JwtPayload
                next();
            })

        }
    );
};

export default auth;
