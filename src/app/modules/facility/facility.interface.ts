// export type TFacility = {
//     name: string;
//     description: string;
//     pricePerHour: number;
//     image: string;
//     facilityType: "topFacility" | "normalFacility";
//     location: string;
//     isDeleted: boolean
// }

export type TFacility = {
    name: string;
    description: string;
    pricePerHour: number;
    image: string;
    facilityType: "topFacility" | "normalFacility";
    location: string;
    isDeleted: boolean;
    features: string[]; 
    operatingHours: string; 
    contactInfo: {
      email: string; 
      phone: string; 
    };
    gallery: string[]; 
  };