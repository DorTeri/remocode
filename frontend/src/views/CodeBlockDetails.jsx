import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
hljs.registerLanguage('javascript', javascript);

const CodeBlockDetails = () => {

    const { id } = useParams()
    const codeBlocks = useSelector((storeState) => storeState.codeBlocksModule.codeBlocks)

    const [codeBlock, setCodeBlock] = useState(null)
    const [isReadOnly, setIsReadOnly] = useState(true)
    const [role, setRole] = useState(null);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const codeBlock = codeBlocks.find(code => code._id === id)
        setCodeBlock(codeBlock)

        const socket = io('http://localhost:3030');
        setSocket(socket);
        socket.on('connect',() => {
            console.log("connected")
        });

        const isFirstUser = true;
        setIsReadOnly(isFirstUser);

        socket.emit('joinCodeBlock', id);

        // Listen for the role assigned by the server
        socket.on('role', (assignedRole) => {
            setRole(assignedRole);
        });

        socket.on('codeBlockUpdate', (updatedCodeBlock) => {
            setCodeBlock(updatedCodeBlock);
        });

        return () => {
            socket.disconnect();
        };
    }, [id])

    const handleCodeChange = (event) => {
        const updatedCode = event.target.innerText; 

        socket.emit('updateCodeBlock', { id, code: updatedCode });
    };


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
                    contentEditable={role === 'student'}
                    onBlur={handleCodeChange}
                    dangerouslySetInnerHTML={{
                        __html: hljs.highlight('javascript', codeBlock.code).value,
                    }}
                />
            </pre>
        </section>
    )
}

export default CodeBlockDetails