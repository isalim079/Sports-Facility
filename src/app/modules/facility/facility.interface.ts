export type TFacility = {
    name: string;
    description: string;
    pricePerHour: number;
    image: string;
    facilityType: "topFacility" | "normalFacility";
    location: string;
    isDeleted: boolean
}