import React from 'react'
import { useForm } from '../hooks/useForm'
import { useDispatch } from 'react-redux'
import { createCodeBlock } from '../store/actions/codeBlocks.actions'

const CreateCodeBlock = () => {

    const dispatch = useDispatch()

    const submit = (e) => {
        e.preventDefault()

        dispatch(createCodeBlock(codeBlock))
        clearCodeBlock()
    }

    const [codeBlock, handleChange, setCodeBlock] = useForm(
        {
            title: '',
            code: '',
            solution: ''
        }
    )

    const clearCodeBlock = () => {
        setCodeBlock(
            {
                title: '',
                code: '',
                solution: ''
            }
        )
    }


    const { title, code, solution } = codeBlock

    return (
        <section className='create-code-container'>
            <h2>Create Code</h2>
            <form onSubmit={(e) => submit(e)}>
                {/* Title */}
                <label>Title</label>
                <input value={title} onChange={handleChange} type="text" name="title" placeholder='' />

                {/* Code */}
                <label>Code</label>
                <textarea value={code} onInput={handleChange} type='text' name="code" placeholder='' />

                {/* Solution */}
                <label>Solution</label>
                <textarea value={solution} onInput={handleChange} type="text" name="solution" placeholder='' />

                <button type='submit'>Create</button>
            </form>
        </section>
    )
}

export default CreateCodeBlock