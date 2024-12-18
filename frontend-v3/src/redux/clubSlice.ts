import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ClubState {
    club: string;
}

const initialState: ClubState = {
    club: "", // Giá trị khởi tạo
};

const clubSlice = createSlice({
    name: "club",
    initialState,
    reducers: {
        setClub: (state, action: PayloadAction<string>) => {
            state.club = action.payload; // Cập nhật giá trị friend
        },
    },
});

export const { setClub } = clubSlice.actions;
export default clubSlice.reducer;
