
import { TFacility } from "./facility.interface";
import { Facility } from "./facility.model";

const createFacilityIntoDB = async (payload: TFacility) => {
    const result = await Facility.create(payload);
    return result;
};

const getAllFacilityFromDB = async () => {
    const result = await Facility.find({isDeleted: false});
    return result;
};

const updateFacilityIntoDB = async (
    id: string,
    updateInfo: Partial<TFacility>
) => {
    const result = await Facility.findOneAndUpdate({ _id: id }, updateInfo, {
        new: true,
    });
    return result;
};

const deleteFacilityFromDB = async(id: string) => {
    const result = await Facility.findByIdAndUpdate({_id: id}, {isDeleted: true}, {new: true})
    return result
}

export const FacilityServices = {
    createFacilityIntoDB,
    getAllFacilityFromDB,
    updateFacilityIntoDB,
    deleteFacilityFromDB
};
