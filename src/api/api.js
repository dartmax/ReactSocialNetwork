import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "c88210a4-eb5b-40ba-9bd6-b33da9389784"
    }
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10){
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
            return response.data;
        });
    },
    follow (userId) {
        return instance.post(`follow/${userId}`)
    } ,
    unFollow (userId) {
        return instance.delete(`follow/${userId}`)
    },
    getProfile(userId) {
        console.warn('Obsolete method. Please use profileAPI object')
        return profileAPI.getProfile(userId);
    }
};

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/` + userId);
    },
    getStatus(userId){
        return instance.get(`profile/status/` + userId);
    },
    updateStatus(status) {
        return instance.put(`profile/status`, {status: status});
    }
};
export const authAPI = {
    me() {
        return instance.get(`auth/me`);
    },
    login(email, password, rememberMe = false) {
        return instance.post(`auth/login`, {email, password, rememberMe})
    },
    logouts() {
        return instance.delete(`auth/login`)
    },
};

// export const getUsers2 = (currentPage = 1, pageSize = 10) => {
// return instance.get(`users?page=${currentPage}&count=${pageSize}`,).then(response => {
//         return response.data;
//     });
// };