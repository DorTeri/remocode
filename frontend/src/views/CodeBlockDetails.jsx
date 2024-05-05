import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { codeBlocks } from '../constants'
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);

const CodeBlockDetails = () => {

    const params = useParams()
    const [codeBlock, setCodeBlock] = useState(null)

    useEffect(() => {
        const codeBlock = codeBlocks.find(code => code.id === params.id)
        setCodeBlock(codeBlock)
    }, [params])


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
            <pre>
                        <code
                            dangerouslySetInnerHTML={{
                                __html: hljs.highlight('javascript', codeBlock.code).value,
                            }}
                        />
                    </pre>
        </section>
    )
}

export default CodeBlockDetails