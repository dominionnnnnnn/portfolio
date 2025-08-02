import React from 'react'
import { FaEnvelope } from 'react-icons/fa'
import ContactForm from '../components/ContactForm'

const ContactPage = () => {
  return (
    <div className='py-6'>
        <div className='py-12 px-8'>
            <h1 className="text-6xl mt-6 font-extrabold text-white">Contact</h1>
            <p className='text-xl mt-4 text-gray-400'>I'm always available — contact me through email, social media, or a quick call.</p>
        </div>
        <div className='my-3 px-8'>
          <header className='text-3xl text-gray-200 font-bold'>Professional Contact</header>
          <h1 className='text-2xl text-gray-300 font-semibold mt-4'>Direct Communication</h1>
          <table className='text-white w-[50vw] border-1 border-[#515151c7] my-4 bg-black/10 backdrop-blur-md rounded-lg'>
            <tr>
              <th>Method</th>
              <th>Details</th>
            </tr>
            <tr>
              <td>Location</td>
              <td>Nigeria, Ogunstate</td>
            </tr>
            <tr>
              <td>Time Zone</td>
              <td>UTC/GMT +1</td>
            </tr>
            <tr>
              <td>Email</td>
              <td className='text-blue-300'><FaEnvelope className='inline mr-1' />adebiyiquawiy2006@gmail.com</td>
            </tr>
          </table>
        </div>
        <div className="flex gap-12 justify-center">
          <p className='text-[#8a8a8a] text-3xl w-122 tracking-wide'>
            <span className='font-bold text-white'>Reach out,</span> and let's create something amazing together.
          </p>
          <ContactForm/>
        </div>
    </div>
  )
}

export default ContactPage