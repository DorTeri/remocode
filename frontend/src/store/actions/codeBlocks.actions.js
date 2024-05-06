import { codeBlockService } from "../../services/codeBlocks.service"
import { ADD_CODE_BLOCK, SET_CODE_BLOCKS } from "../reducers/codeBlocks.reducers"


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

export function createCodeBlock(codeBlock) {
    return async (dispatch, getState) => {
        try {
            const createdCodeBlock = await codeBlockService.createCodeBlock(codeBlock)
            dispatch({ type: ADD_CODE_BLOCK, payload: createdCodeBlock })
            return createdCodeBlock
        } catch (error) {
            console.log('error:', error)
        }
    }
}
