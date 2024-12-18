import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FriendState {
    friend: string;
}

const initialState: FriendState = {
    friend: "", // Giá trị khởi tạo
};

const friendSlice = createSlice({
    name: "friend",
    initialState,
    reducers: {
        setFriend: (state, action: PayloadAction<string>) => {
            state.friend = action.payload; // Cập nhật giá trị friend
        },
    },
});

export const { setFriend } = friendSlice.actions;
export default friendSlice.reducer;
