
export const SET_CODE_BLOCKS = 'SET_CODE_BLOCKS'
export const ADD_CODE_BLOCK = 'ADD_CODE_BLOCK'


const INITIAL_STATE = {
    codeBlocks: []
}

export function codeBlocksReducer(state = INITIAL_STATE, action = {}) {

    switch (action.type) {
        case SET_CODE_BLOCKS:
            return {
                ...state,
                codeBlocks: action.payload
            }

        case ADD_CODE_BLOCK:
            return {
                ...state,
                codeBlocks: [...state.codeBlocks, action.payload]
            }

        default:
            return state;
    }
}