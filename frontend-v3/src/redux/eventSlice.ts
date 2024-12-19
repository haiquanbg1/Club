import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EventState {
    event: string;
}

const initialState: EventState = {
    event: "", // Giá trị khởi tạo
};

const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {
        setEvent: (state, action: PayloadAction<string>) => {
            state.event = action.payload; // Cập nhật giá trị friend
        },
    },
});

export const { setEvent } = eventSlice.actions;
export default eventSlice.reducer;
