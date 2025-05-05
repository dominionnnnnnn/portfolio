import React from 'react'
import { FaLinkedinIn, FaInstagram, FaWhatsapp, FaTwitter} from 'react-icons/fa'


const Contact = () => {
  return (
    <div id='contact' className='scroll-mt-20 scroll-smooth my-8 py-4 flex flex-col items-center gap-6'>
      <header className='text-white font-extrabold text-center text-3xl lg:text-4xl name tracking-wide'>
        Got a brand or big project? Let’s talk!
      </header>
      <a href="https://forms.gle/taebDeDT4S6fRpGX7" className='text-white border-1 border-[#00A8E8] bg-[#00A8E8] px-4 py-2 rounded-xl mx-auto text-xl'>Contact Me</a>
      <div className='flex gap-12 mt-3 lg:mt-2'>
            <a href="https://www.linkedin.com/in/devdominion"><FaLinkedinIn className='size-8  text-gray-300'/></a>
            <a href="#"><FaInstagram  className='size-8 text-gray-300'/></a>
            <a href="https://wa.me/+2349038207504?text=Hello%20I%20would%20like%20to%20get%20in%20touch!"><FaWhatsapp  className='size-8 text-gray-300'/></a>
            <a href="https://twitter.com/messages/compose?recipient_id=Dominion864414"><FaTwitter  className='size-8  text-gray-300'/></a>
        </div>
    </div>
  )
}

export default Contact
