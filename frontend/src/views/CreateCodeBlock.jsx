import React from 'react'
import { useForm } from '../hooks/useForm'

const CreateCodeBlock = () => {

    const submit = (e) => {
        e.preventDefault()
        
        console.log("codeBlock", codeBlock)
    }

    const [codeBlock, handleChange, setCodeBlock] = useForm(
        {
            title: '',
            code: '',
            solution: ''
        }
    )


    const { title, code, solution } = codeBlock

    return (
        <section className='create-code-container'>
            <form onSubmit={(e) => submit(e)}>
                {/* Title */}
                <label>Title</label>
                <input value={title} onChange={handleChange} type="text" name="title" placeholder='' />

                {/* Code */}
                <label>Code</label>
                <input value={code} onChange={handleChange} type="text" name="code" placeholder='' />

                {/* Solution */}
                <label>Solution</label>
                <input value={solution} onChange={handleChange} type="text" name="solution" placeholder='' />

                <button type='submit'>Submit</button>
            </form>
        </section>
    )
}

export default CreateCodeBlock