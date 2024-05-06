import axios from "axios"

export const codeBlockService = {
    getAllCodeBlocks,
    createCodeBlock,
}

const API_URL = 'http://3.67.6.184:3030'

async function getAllCodeBlocks() {
    try {
        const res = await axios.get(`${API_URL}/codeBlock`)
        console.log("res", res)
        console.log("data", res.data)
        return res.data
    } catch (error) {
        console.log("Error in getAllCodeBlocks service", error)
    }
}

async function createCodeBlock(codeBlock) {
    try {
        const res = await axios.post(`${API_URL}/codeBlock`, codeBlock)
        return res.data
    } catch (error) {
        console.log("Error in createCodeBlock service", error)
    }
}