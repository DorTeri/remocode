import React from 'react'
import CodeBlockPreview from '../cmps/CodeBlockPreview'
import { codeBlocks } from '../constants'

const HomePage = () => {


  return (
    <section className='homepage-container'>
      <h2>Choose Code Block</h2>
      <div className='code-blocks-container'>
        {
          codeBlocks.map(code => (
            <CodeBlockPreview code={code} key={code.title}/>
          ))
        }
      </div>
    </section>
  )
}

export default HomePage