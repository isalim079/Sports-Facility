export type TLoginUser = {
    name: string;
    email: string;
    role: "admin" | "user";
    phone: string;
    address: string;
    password: string;

}