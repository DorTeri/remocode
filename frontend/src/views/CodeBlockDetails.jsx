import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import { useSelector } from 'react-redux'
import io from 'socket.io-client'
import { socketService } from '../services/socket.service'
hljs.registerLanguage('javascript', javascript);

const CodeBlockDetails = () => {

    const { id } = useParams()
    const codeBlocks = useSelector((storeState) => storeState.codeBlocksModule.codeBlocks)

    const [codeBlock, setCodeBlock] = useState(null)
    const [role, setRole] = useState(null);
    const [isCodeCorrect, setIsCodeCorrect] = useState(false)

    // Finds codeBlock from store
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
        socketService.on('role', assignRole)
        socketService.on('codeBlockUpdate', updateCodeBlock)

        return () => {
            socketService.emit('clearUsersBlock', id);
            socketService.off('role', assignRole)
            socketService.off('codeBlockUpdate', updateCodeBlock)
        };
    }, [])


    const assignRole = (assignedRole) => {
        setRole(assignedRole)
    }

    const updateCodeBlock = (updatedCodeBlock) => {
        setCodeBlock(updatedCodeBlock)
    }

    const handleCodeChange = (event) => {
        const updatedCode = event.target.innerText


        socketService.emit('updateCodeBlock', { id, code: updatedCode });

    };


    const checkIsCodeCorrect = () => {
        if (!codeBlock) return
        const codeWithoutspace = codeBlock.code.replace(/\s/g, '');
        const solutionWithoutSpace = codeBlock.solution.replace(/\s/g, '');
        if (codeWithoutspace === solutionWithoutSpace) {
            setIsCodeCorrect(true)
        } else {
            setIsCodeCorrect(false)
        }
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