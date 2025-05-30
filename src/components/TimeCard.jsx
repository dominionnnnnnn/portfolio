import React from 'react'

const TImeCard = ({ title, time, content }) => {
  return (
    <div className='border-1 border-gray-600 w-82 p-4 rounded-lg'>
      <h1 className='text-xl font-bold'>{title}</h1>
      <small>{time}</small>
      <p>{content}</p>
    </div>
  )
}

export default TImeCard
