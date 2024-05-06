import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import { useSelector } from 'react-redux'
import { socketService } from '../services/socket.service'
hljs.registerLanguage('javascript', javascript);

const CodeBlockDetails = () => {

    const { id } = useParams()
    const codeBlocks = useSelector((storeState) => storeState.codeBlocksModule.codeBlocks)

    const [codeBlock, setCodeBlock] = useState(null)
    const [role, setRole] = useState(null);
    const [isCodeCorrect, setIsCodeCorrect] = useState(false)

    // Finds codeBlock from store based on the id from the params
    useEffect(() => {
        const codeBlock = codeBlocks.find(code => code._id === id)
        setCodeBlock(codeBlock)
    }, [id, codeBlocks]);

    // Checking if code is correct every change
    useEffect(() => {
        if (!codeBlock) return
        socketService.emit('joinCodeBlock', id)
        checkIsCodeCorrect()
    }, [codeBlock, id])

    // Listening and removing listeners
    useEffect(() => {
        socketService.on('role', handleSetRole)
        socketService.on('codeBlockUpdate', handleUpdateCodeBlock)

        return () => {
            socketService.emit('clearUsersBlock', id);
            socketService.off('role', handleSetRole)
            socketService.off('codeBlockUpdate', handleUpdateCodeBlock)
        };
    }, [])


    const handleSetRole = (role) => {
        setRole(role)
    }

    const handleUpdateCodeBlock = (updatedCodeBlock) => {
        setCodeBlock(updatedCodeBlock)
    }

    const handleCodeChange = (event) => {
        const updatedCode = event.target.innerText

        socketService.emit('updateCodeBlock', { id, code: updatedCode });
    };


    const checkIsCodeCorrect = () => {
        if (!codeBlock) return

        // I decided to check without spaces so it will not fall on indentations
        const codeWithoutspace = codeBlock.code.replace(/\s/g, '');
        const solutionWithoutSpace = codeBlock.solution.replace(/\s/g, '');

        // Handle correct or not
        codeWithoutspace === solutionWithoutSpace ? setIsCodeCorrect(true) : setIsCodeCorrect(false)
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
            <div className={`code-container ${isCodeCorrect ? 'correct' : ''}`}>
                <pre>
                    <code
                        contentEditable={role === 'student'}
                        onBlur={handleCodeChange}
                        dangerouslySetInnerHTML={{
                            __html: hljs.highlight(codeBlock.code, { language: 'javascript' }).value,
                        }}
                    />
                </pre>
            </div>
            {
                isCodeCorrect && (
                    <div className='correct-container'>
                        Good Job!
                    </div>
                )
            }
        </section>
    )
}

export default CodeBlockDetails