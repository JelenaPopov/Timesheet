import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';

export interface User {
    id: number
    version: number
    firstName: string,
    lastName: string,
    weeklyWorkingHours: number
}

interface UserInfo {
    created: string,
    exp: string,
    roles: string[],
    sub: string
}

interface TokenState {
    token: string | null,
    user: UserInfo | null
}

const initialState = { token: null, user: null } as TokenState

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setNewValue: (state, action: PayloadAction<string | null>) => {
            let tokenValue = action.payload;
            if (!tokenValue) {
                tokenValue = window.localStorage.getItem('token');
            }

            if (tokenValue) {
                state.token = tokenValue;
                state.user = jwtDecode(tokenValue)
                window.localStorage.setItem('token', tokenValue);
            } else {
                state.token = null;
                state.user = null;
                window.localStorage.removeItem('token');
            }
        }
    },
})

export const { setNewValue } = authSlice.actions
export default authSlice.reducer