import React from 'react'

const contact = () => {
  return (
    <div name='contact' className='w-full h-fit bg-gradient-to-b from-background2 to-background lg:p-20 md:p-10 sm:p-3 -mt-1 text-white'>

        <div className='flex flex-col p-4 justify-center max-w-screen-lg mx-auto'>
            <div className=' pb-8'>
                <p className='text-4xl font-bold inline border-b-4 border-grey'>Contact</p>
                <p className='py-6'>Submit the form below to get in touch with me</p>
            </div>

            <div className='flex justify-center items-center'>
                <form action='https://getform.io/f/548955bc-329d-4680-8528-cc609e5f4bdc' method='POST' className=' flex flex-col w-full md:w-1/2'>
                    <input type='text' name='name' placeholder='Enter your name' className='p-2 bg-transparent border-2 rounded-md text-white focus:outline-none'/>
                    <input type='text' name='email' placeholder='Enter your email' className='p-2 my-4 bg-transparent border-2 rounded-md text-white focus:outline-none'/>
                    <textarea placeholder='Enter your message' name='message' rows='10' className='p-2 bg-transparent border-2 rounded-md text-white focus:outline-none'>
                    </textarea>

                    <button type='submit' className='text-black bg-gradient-to-bl from-orange to-amber px-6 py-3 my-8 mx-auto flex items-center rounded-md hover:scale-110 duration-300'>Submit</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default contact
