import { codeBlockService } from "../../services/codeBlocks.service"
import { SET_CODE_BLOCKS } from "../reducers/codeBlocks.reducers"


export function getAllCodeBlocks() {
    return async (dispatch, getState) => {
        try {
            const codeBlocks = await codeBlockService.getAllCodeBlocks()
            dispatch({ type: SET_CODE_BLOCKS, payload: codeBlocks })
            return codeBlocks
        } catch (error) {
            console.log('error:', error)
        }
    }
}
