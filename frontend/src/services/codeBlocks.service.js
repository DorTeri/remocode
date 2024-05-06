import axios from "axios"

export const codeBlockService = {
    getAllCodeBlocks,
    createCodeBlock,
}
if (process.env.NODE_ENV === 'production') {
    console.log('Running in production environment');
} else {
    console.log('Running in development environment');
}
const API_URL = process.env.NODE_ENV === 'production' ? 'https://remocode-server.onrender.com/api' :
    'http://localhost:3030'

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