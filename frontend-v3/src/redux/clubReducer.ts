// src/redux/clubReducer.ts
import { AnyAction } from 'redux';

// Định nghĩa kiểu dữ liệu của state
export interface ClubState {
    clubRoles: Record<string, string[]>;
}

const initialState: ClubState = {
    clubRoles: {},
};

// Định nghĩa các hành động
const SET_ROLES = 'SET_ROLES';

export const setRoles = (clubId: string, roles: string) => ({
    type: SET_ROLES,
    payload: { clubId, roles },
});

// Reducer để xử lý state
export const clubReducer = (state = initialState, action: AnyAction): ClubState => {
    switch (action.type) {
        case SET_ROLES:
            return {
                ...state,
                clubRoles: {
                    ...state.clubRoles,
                    [action.payload.clubId]: action.payload.roles,
                },
            };
        default:
            return state;
    }
};
