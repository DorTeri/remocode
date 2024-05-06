import React from 'react'

const RolePreview = ({ role }) => {
  return (
    <div className='role-preview'>
      {role === 'mentor' ? 'Read only mode' : 'Start editing'}
    </div>
  )
}

export default RolePreview