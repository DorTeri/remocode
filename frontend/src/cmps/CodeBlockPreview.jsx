import React from 'react'
import { useNavigate } from 'react-router-dom'

const CodeBlockPreview = ({ code }) => {

    const navigate = useNavigate()

    const handleCodeClicked = () => {
        navigate(`/codeDetails/${code.id}`)
    }

    return (
        <section className='code-block-preview' onClick={handleCodeClicked}>
            <h2>{code.title}</h2>
        </section>
    )
}

export default CodeBlockPreview