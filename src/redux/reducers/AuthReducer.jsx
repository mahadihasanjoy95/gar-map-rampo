const INIT_STATE = {
    logout: false
};

export const authReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "LOGOUT":
         return {
             ...state,
             logout: true
         }

        case "LOGIN":
            return {
                ...state,
                logout: false
            }

        default:
            return state
    }
}