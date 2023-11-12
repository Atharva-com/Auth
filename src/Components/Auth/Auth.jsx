import React, { useState } from 'react'
import useAuthModal from '../../helpers/UseAuthModal'
import Modal from '../Modal/Modal'
import { FaFacebookF } from 'react-icons/fa'
import { FaGoogle } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'
const Auth = () => {

  const [toggleClass, settoggleClass] = useState(false)
  const { onClose, isOpen } = useAuthModal()

  const onChange = (open) => {
    if (!open) {
      onClose();
    }
  }

  const toggleClassHandler = () => {
    settoggleClass(!toggleClass)
  }

  return (
    <Modal
      isOpen={isOpen}
      onChange={onChange}
    >
      <div className='flex justify-center items-center w-full h-full relative'>

        {/* Sign in */}

        <div className='w-1/2 p-10 bg-white h-[31.5rem] relative'>

          {/* heading */}

          <h1 className='font-bold text-black text-center text-4xl tracking-wider'>Sign in</h1>

          <div className='flex flex-col gap-y-2 items-center justify-center my-4'>

            {/* Social Account Sign in */}

            <div className='flex justify-center items-center gap-x-2'>

              {/* Facebook */}

              <div className='rounded-[50%] border border-[#DDDDDD] flex items-center justify-center w-[40px] h-[40px] p-[0.8rem] cursor-pointer hover:border-black transition-all'>
                <FaFacebookF />
              </div>

              {/* Google */}

              <div className='rounded-[50%] border border-[#DDDDDD] flex items-center justify-center w-[40px] h-[40px] p-[0.8rem] cursor-pointer hover:border-black transition-all'>
                <FaGoogle />
              </div>

            </div>

            <p className='font-light text-gray-800 text-lg'>or use your credentials</p>

          </div>

          {/* Sign in form */}

          <form action="" method='POST' className='flex items-center justify-center flex-col gap-y-4'>

            {/* Email Sign in */}

            <div className='flex items-center justify-center w-full'>

              <div className='text-[1rem] relative w-3/4'>

                <input type="email" id='loginEmail' name='loginEmail' required className='text-black p-4 border border-black rounded-[10px] transition duration-150 font-medium w-full bg-gray-50' />

                <label htmlFor="loginEmail" className='absolute top-4 left-4 text-black font-normal transition duration-150 text-lg'>Email</label>

              </div>

            </div>

            {/* Sign in Password */}

            <div className='flex items-center justify-center w-full'>

              <div className='text-[1rem] relative w-3/4'>

                <input type="password" id='loginPassword' name='loginPassword' required className='text-black p-4 border border-black rounded-[10px] transition duration-150 font-medium w-full bg-gray-50' />

                <label htmlFor="loginPassword" className='absolute top-4 left-4 text-black font-normal transition duration-150 text-lg'>Password</label>

              </div>

            </div>

            {/* Forgot Password */}
            <div className='flex items-center justify-center w-full'>
              <p className='text-gray-800 font-light text-lg cursor-pointer'>Forgot your password?</p>
            </div>

            {/* Sign in button */}

            <button type='button' className='border border-[#FF4B2B] bg-[#FF4B2B] text-[#FFFFFF] text-lg font-semibold py-[12px] px-[45px] tracking-[1px] uppercase transition-transform duration-100 ease-in active:transform active:scale-95 focus:outline-none rounded-[20px]'>Sign in</button>

          </form>

          <button
            className="text-purple-900 hover:text-purple-800 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:outline-none" aria-label="Close"
          >
            <IoMdClose />
          </button>

        </div>

        {/* Sign up */}

        <div className='w-1/2 p-10 bg-white relative'>

          {/* heading */}

          <h1 className='font-bold text-black text-center text-4xl tracking-wider'>Create Account</h1>

          <div className='flex flex-col gap-y-2 items-center justify-center my-4'>

            {/* Social Account Sign up */}

            <div className='flex justify-center items-center gap-x-2'>

              {/* Facebook */}

              <div className='rounded-[50%] border border-[#DDDDDD] flex items-center justify-center w-[40px] h-[40px] p-[0.8rem] cursor-pointer hover:border-black transition-all'>
                <FaFacebookF />
              </div>

              {/* Google */}

              <div className='rounded-[50%] border border-[#DDDDDD] flex items-center justify-center w-[40px] h-[40px] p-[0.8rem] cursor-pointer hover:border-black transition-all'>
                <FaGoogle />
              </div>

            </div>

            <p className='font-light text-gray-800 text-lg'>or use your email and username to register</p>

          </div>

          {/* Sign up form */}

          <form action="" method='POST' className='flex items-center justify-center flex-col gap-y-4'>

            {/* Username */}

            <div className='flex items-center justify-center w-full'>

              <div className='text-[1rem] relative w-3/4'>

                <input type="text" id='username' name='username' required className='text-black p-4 border border-black rounded-[10px] transition duration-150 font-medium w-full bg-gray-50' />

                <label htmlFor="username" className='absolute top-4 left-4 text-black font-normal transition duration-150 text-lg'>username</label>

              </div>

            </div>

            {/* Email Sign up */}

            <div className='flex items-center justify-center w-full'>

              <div className='text-[1rem] relative w-3/4'>

                <input type="email" id='signupEmail' name='signupEmail' required className='text-black p-4 border border-black rounded-[10px] transition duration-150 font-medium w-full bg-gray-50' />

                <label htmlFor="signupEmail" className='absolute top-4 left-4 text-black font-normal transition duration-150 text-lg'>Email</label>

              </div>

            </div>

            {/* Sign up password */}

            <div className='flex items-center justify-center w-full'>

              <div className='text-[1rem] relative w-3/4'>

                <input type="password" id='signupPassword' name='signupPassword' required className='text-black p-4 border border-black rounded-[10px] transition duration-150 font-medium w-full bg-gray-50' />

                <label htmlFor="signupPassword" className='absolute top-4 left-4 text-black font-normal transition duration-150 text-lg'>Password</label>

              </div>

            </div>

            {/* Sign up button */}

            <button type='button' className='border border-[#FF4B2B] bg-[#FF4B2B] text-[#FFFFFF] text-lg font-semibold py-[12px] px-[45px] tracking-[1px] uppercase transition-transform duration-100 ease-in active:transform active:scale-95 focus:outline-none rounded-[20px]'>Sign up</button>

          </form>

          <button
            className="text-purple-900 hover:text-purple-800 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:outline-none" aria-label="Close"
          >
            <IoMdClose />
          </button>

        </div>

        {/* color box */}

        <div className={`h-full w-1/2 p-10 absolute top-0 flex flex-col items-center justify-center ${toggleClass ? 'left-[50%]' : 'left-0'} `} style={{ background: 'linear-gradient(90deg, rgba(240, 117, 60, 1) 0%, rgba(255, 59, 0, 1) 100%)' }}>

          {/* heading */}

          <h1 className='font-bold text-white text-center text-4xl tracking-wider'>Welcome Back!</h1>

          <div className='flex flex-col gap-y-2 items-center justify-center my-4'>

            <p className='font-light text-white text-lg text-center'>To keep connected with us please login with your personal info</p>

          </div>

          <button type='button' className='border border-white bg-transparent text-[#FFFFFF] text-lg font-semibold py-[12px] px-[45px] tracking-[1px] uppercase transition-transform duration-100 ease-in active:transform active:scale-95 focus:outline-none rounded-[20px]' onClick={toggleClassHandler}>Sign in</button>

        </div>

      </div>

    </Modal>
  )
}

export default Auth