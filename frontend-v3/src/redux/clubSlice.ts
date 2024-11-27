// src/redux/clubSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Định nghĩa kiểu dữ liệu cho state
interface ClubState {
    clubId: string | null;
}

const initialState: ClubState = {
    clubId: null, // giá trị mặc định của clubId là null
};

const clubSlice = createSlice({
    name: 'club',
    initialState,
    reducers: {
        setClubId: (state, action: PayloadAction<string | null>) => {
            state.clubId = action.payload;  // Cập nhật giá trị clubId
        },
    },
});

export const { setClubId } = clubSlice.actions;

export default clubSlice.reducer;
