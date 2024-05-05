import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { codeBlocks } from '../constants'


const CodeBlockDetails = () => {

    const params = useParams()
    const [codeBlock, setCodeBlock] = useState(null)

    useEffect(() => {
        fetchCodeBlock()
    }, [params])

    const fetchCodeBlock = () => {
        const codeBlock = codeBlocks.find(code => code.id === params.id)
        setCodeBlock(codeBlock)
    }

    if (!codeBlock) {
        return (
            <div>
                loading...
            </div>
        )
    }

    return (
        <section className='code-block-details'>
            <h2>{codeBlock.title}</h2>
            <p>
                {codeBlock.code}
            </p>
        </section>
    )
}

export default CodeBlockDetails