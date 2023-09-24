import { createSlice } from "@reduxjs/toolkit";

const INITTAL_STATE = {
    users: [],
    FilterData: [],
    userCount: 0,
    blockedUserCount: 0,
}
const userSlice = createSlice({
    name: 'usersData',
    initialState: INITTAL_STATE,
    reducers: {
        setUsersData: (state, action) => {
            state.users = action.payload;
            state.FilterData = action.payload;
        },
        clearUserData: (state, action) => {
            state.users = FilterUsers = [];
        },
        UpdateUserData: (state, action) => {
            const updates = state.users.map((user) => {
                if (user._id === action.payload.id) {
                    user.username = action.payload.username;
                    user.email = action.payload.email;
                    user.phone = action.payload.phone;
                    user.image = action.payload.image;
                }
                return user;
            })
            state.users = state.FilterData = updates;
        },
        UpdateUserData: (state, action) => {
            const updates = state.users.map((user) => {
              if (user._id === action.payload.id) {
                user.name = action.payload.username;
                user.email = action.payload.email;
                user.phone = action.payload.phone;
                user.image = action.payload.image;
              }
              return user;
            });
          
            console.log('Updated Users:', updates); // Add this line for debugging
            state.users = state.FilterData = updates;
          },
          

       
          
        ChangeAccess: (state, action) => {
            const updates = state.users.map((user) => {
                if (user._id === action.payload.id) {
                    user.status = action.payload.status
                }
                return user;
            })
            state.users = state.FilterData = updates;
        },
        FilterUsers: (state, action) => {
            const filterData = state.users.filter((user) => {
                return user?.username.toLowerCase().match(action.payload.toLowerCase());
            })
            state.FilterData = filterData;
        },
        DeleteUser: (state, action) => {
            const updates = state.users.filter((user) => {
                return user._id !== action.payload;
            })
            state.users = state.FilterData = updates;
        },
        SetUserCount: (state, action) => {
            state.userCount = action.payload.userCount;
            state.blockedUserCount = action.payload.blockedUserCount;
        },
    }
})
export const { 
    setUsersData, 
    clearUserData, 
    UpdateUserData, 
    ChangeAccess, 
    FilterUsers, 
    DeleteUser, 
    SetUserCount ,
} = userSlice.actions;
export default userSlice.reducer;
