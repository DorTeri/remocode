import axios from "axios"

export const codeBlockService = {
    getAllCodeBlocks,
    createCodeBlock,
}

// Choose URL
const API_URL = process.env.NODE_ENV === 'production' ? 'https://remocode-server.onrender.com/api' :
    'http://localhost:3030/api'

async function getAllCodeBlocks() {
    try {
        const res = await axios.get(`${API_URL}/codeBlock`)
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