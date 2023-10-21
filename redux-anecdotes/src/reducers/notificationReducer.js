import { createSlice } from "@reduxjs/toolkit";
const initialState = null

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers:{
        changeNotification(state, action) {
            return action.payload
        }
    }
})

export const { changeNotification } = notificationSlice.actions

export const setNotification = (content, time) => {
    return async dispatch => {
        dispatch(changeNotification(content))
        setTimeout(() => {
            dispatch(changeNotification(null))
        }, time*1000)
    }

}

export default notificationSlice.reducer