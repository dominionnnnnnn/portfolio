import React from 'react'

const Footer = () => {
  return (
    <div className='border-t-1 py-4 flex justify-between px-8' style={{ borderColor: 'var(--border-default)' }}>
      <h1 className='font-extrabold name' style={{ color: 'var(--text-primary)' }}>DOMSTACK</h1>
      <p className='font-extrabold' style={{ color: 'var(--text-primary)' }}>© All rights reserved</p>
    </div>
  )
}

export default Footer