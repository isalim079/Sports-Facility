import { Types } from "mongoose";
import { TFacility } from "./facility.interface";
import { Facility } from "./facility.model";

const createFacilityIntoDB = async (payload: TFacility) => {
    const result = await Facility.create(payload);
    return result;
};

const getAllFacilityFromDB = async () => {
    const result = await Facility.find();
    return result;
};

const updateProductIntoDB = async (id: string, updateInfo: Partial<TFacility>) => {
   

    const result = await Facility.findOneAndUpdate({ _id: id }, updateInfo, {
        new: true,
       
    });
    return result;
};

export const FacilityServices = {
    createFacilityIntoDB,
    getAllFacilityFromDB,
    updateProductIntoDB,
};
