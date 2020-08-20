import axios from "axios";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "c88210a4-eb5b-40ba-9bd6-b33da9389784"
    }
});

export enum ResultCodesEnum {
    Success = 0,
    Error = 0,
}

export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}


//выпелено из users-api.ts
// getProfile(userId: number) {
//     console.warn('Obsolete method. Please use profileAPI object')
//     return profileAPI.getProfile(userId);
// }

// export const getUsers2 = (currentPage = 1, pageSize = 10) => {
// return instance.get(`users?page=${currentPage}&count=${pageSize}`,).then(response => {
//         return response.data;
//     });
// };