import React, { useEffect, useState } from 'react'
import CodeBlockPreview from '../cmps/CodeBlockPreview'
import { codeBlocks } from '../constants'
import { codeBlockService } from '../services/codeBlocks.service'

const HomePage = () => {

  const [codeBlocksFromBack, setCodeBlocksFromBack] = useState(null)

  useEffect(() => {
    fetchCodeBlocks()
  }, [])

  const fetchCodeBlocks = async () => {
    const codeBlocks = await codeBlockService.getAllCodeBlocks()
    setCodeBlocksFromBack(codeBlocks)
  }



  return (
    <section className='homepage-container'>
      <h2>Choose Code Block</h2>
      <div className='code-blocks-container'>
        {
          codeBlocksFromBack ? (
            codeBlocksFromBack.map(code => (
              <CodeBlockPreview code={code} key={code.title} />
            ))) : (
            codeBlocks.map(code => (
              <CodeBlockPreview code={code} key={code.title} />
            ))
          )
        }
      </div>
    </section>
  )
}

export default HomePage