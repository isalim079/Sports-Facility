import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import config from "../../config";

const loginUser = async (payload: TLoginUser) => {


    // check if the user is exist
    const isUserEmailExists = await User.findOne({email: payload?.email})

    if(!isUserEmailExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found')
    }

    // check password
    const isPasswordMatched = await bcrypt.compare(payload?.password, isUserEmailExists?.password)

    if(!isPasswordMatched) {
        throw new AppError(httpStatus.NOT_FOUND, 'Password not matched')
    }


    const jwtPayload = {
      id: isUserEmailExists?._id,
        email: isUserEmailExists?.email,
        role: isUserEmailExists?.role,
      };
    
      const accessToken = jwt.sign(
        jwtPayload,
        config.jwt_access_secret as string,
        {expiresIn: '10d'}
      );
    
      return {
        user: {
          _id: isUserEmailExists._id,
          name: isUserEmailExists.name,
          email: isUserEmailExists.email,
          role: isUserEmailExists.role,
          phone: isUserEmailExists.phone,
          address: isUserEmailExists.address,
      },
        accessToken
      };
}

export const AuthServices = {
    loginUser
}