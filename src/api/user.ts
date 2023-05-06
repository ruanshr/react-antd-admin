import { request } from "./proxy"; 

export const getUser = () => request.get("/getUser")