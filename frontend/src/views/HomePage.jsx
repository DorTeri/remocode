import React from 'react'
import CodeBlockPreview from '../cmps/CodeBlockPreview'
import { useSelector } from 'react-redux'

const HomePage = () => {

  const codeBlocks = useSelector((storeState) => storeState.codeBlocksModule.codeBlocks)

  if (!codeBlocks) return (
    <div>
      Loading..
    </div>
  )

  return (
    <section className='homepage-container'>
      <h2>Choose Code Block</h2>
      <div className='code-blocks-container'>
        {
          codeBlocks.map(code => (
            <CodeBlockPreview code={code} key={code.title} />
          ))
        }
      </div>
    </section>
  )
}

export default HomePage