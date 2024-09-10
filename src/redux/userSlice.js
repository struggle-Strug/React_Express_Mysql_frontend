import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signup = createAsyncThunk("/api/user/register", async (payload) => {
    const { name, gender, email, password } = payload;
    try {
        const res = axios.post(`${process.env.REACT_APP_YOUR_HOSTNAME}/api/user/register`, {
            name,
            gender,
            email,
            password
        });
        return (await res).data;
    } catch (e) {
        if (e.response) {
            return { ...e.response.data, error: true };
        }
        return { error: true, message: "Server is not running correctly" }

    }
});

export const signin = createAsyncThunk("/api/user/login", async (payload) => {
    const { email, password } = payload;
    try {
        const res = axios.post(`${process.env.REACT_APP_YOUR_HOSTNAME}/api/user/login`, {
            email,
            password
        });
        return (await res).data

    } catch (e) {
        if (e.response) {
            return { ...e.response.data, error: true }
        }
        return { error: true, message: "Server is not running correctly." };
    }
})

// export const updateUserInfo = createAsyncThunk('/api/user/update/', async (payload) => {
//     const { _id, name, userId, birthday, password, currentpassword } = payload;
//     try {
//         const res = axios.put(`${process.env.REACT_APP_YOUR_HOSTNAME}/api/user/update/${_id}`, {
//             name,
//             userId,
//             birthday,
//             currentpassword,
//             password
//         });
//         return (await res).data;
//     } catch (e) {
//         if (e.response) {
//             return { ...e.response.data, error: true }
//         } return { error: true, message: "Server is not runnint correctly" }
//     }
// })


// export const getUser = createAsyncThunk("/tokenlogin", async () => {
//     const res = axios.get(`${process.env.REACT_APP_YOUR_HOSTNAME}/api/user/tokenlogin`)
//     return (await res).data;
// })

// export const getAllUsers = createAsyncThunk("/api/user/get", async () => {
//     try {
//         const res = axios.get(`${process.env.REACT_APP_YOUR_HOSTNAME}/api/user/get`);
//         return (await res).data;
//     } catch (e) {
//         if (e.response) {
//             return { ...e.response.data, error: true }
//         } return { error: true, message: "Server is not runnint correctly" }
//     }
// })

// export const deleteUser = createAsyncThunk("/api/user/delete", async (payload) => {
//     try {
//         const res = axios.delete(`${process.env.REACT_APP_YOUR_HOSTNAME}/api/user/delete/${payload}`);
//         return (await res).data;
//     } catch (e) {
//         if (e.response) {
//             return { ...e.response.data, error: true }
//         } return { error: true, message: "Server is not runnint correctly" }
//     }
// })


export const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoading: false,
        user: null,
        users: null,
        error: ""
    },
    reducers: {
        resetError: (state) => {
            state.error = "";
        },
        logOut: (state) => {
            state.token = null;
            localStorage.removeItem("token");
            state.user = [];
        }
    },
    extraReducers: {
        [signin.pending]: (state) => {
            state.isLoading = true;
        },
        [signin.fulfilled]: (state, { payload }) => {
            if (payload.token) {
                axios.defaults.headers.common["Authorization"] = payload.token;
                localStorage.setItem("token", payload.token);
                state.user = payload.user;
                state.isLoading = false;
            } else {
                state.error = payload.message;
                state.isLoading = false;
            }
        },
        [signin.rejected]: (state, { payload }) => {
            state.error = payload.message;
            state.isLoading = false;
        },
        [signup.fulfilled]: (state, payload) => {
            if (payload.error) {
                state.error = payload.message;
            }
        },
        // [updateUserInfo.fulfilled]: (state, { payload }) => {
        //     state.user = payload.user;

        // },
        // [getUser.fulfilled]: (state, { payload }) => {
        //     localStorage.setItem("token", payload.token);
        //     state.user = payload.user;
        //     state.token = payload.token;
        // },
        // [getAllUsers.fulfilled]: (state, { payload }) => {
        //     state.users = payload.users;
        // },
        // [deleteUser.pending]: (state) => {
        //     state.isLoading = true;
        // },
        // [deleteUser.fulfilled]: (state, { payload }) => {
        //     state.isLoading = false;
        //     state.users = payload.users;
        // }
    }


});

export const { logOut, resetError } = userSlice.actions;
export default userSlice.reducer;