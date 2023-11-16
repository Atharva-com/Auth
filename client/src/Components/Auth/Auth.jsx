import React, { useState } from 'react'
import useAuthModal from '../../helpers/UseAuthModal'
import Modal from '../Modal/Modal'
import SignIn from './SignIn'
import Signup from './Signup'

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
      <div className='relative overflow-hidden max-w-full h-[31.5rem]'>

        <SignIn toggleClass={toggleClass} />

        <Signup toggleClass={toggleClass} />

        {/* color box */}

        <div className={`h-full w-1/2 absolute top-0 left-[50%] overflow-hidden z-[100] ${toggleClass ? 'transform translate-x-[-100%] duration-700' : 'transform translate-x-[0] duration-700'}`} >

          <div className={`relative bg-no-repeat bg-cover left-[-100%] h-full w-[200%] ${toggleClass ? 'transform translate-x-[50%]' : 'transform translate-x-0 '}`} style={{ background: 'linear-gradient(90deg, rgb(245 94 24) 0%, rgba(255, 59, 0, 1) 100%)' }}>

            {/* left portion - Sign in */}

            <div className={`h-full w-1/2 p-10 absolute top-0 flex flex-col items-center justify-center transform ${toggleClass ? 'translate-x-0' : 'translate-x-[-20%]'}`}>

              {/* heading */}

              <h1 className='font-bold text-white text-center text-4xl tracking-wider'>Welcome Back!</h1>

              {/* tagline */}
              <div className='flex flex-col gap-y-2 items-center justify-center my-4'>

                <p className='font-light text-white text-lg text-center'>To keep connected with us please login with your personal info</p>

              </div>

              {/* Sign in button */}

              <button type='button' className='border border-white bg-transparent text-[#FFFFFF] text-lg font-semibold py-[12px] px-[45px] tracking-[1px] uppercase transition-transform duration-100 ease-in active:transform active:scale-95 focus:outline-none rounded-[20px]' onClick={toggleClassHandler}>Sign in</button>

            </div>

            {/* right portion - Sign up */}

            <div className={`h-full w-1/2 p-10 absolute top-0 flex flex-col items-center justify-center transform ${toggleClass ? 'translate-x-[20%]' : 'translate-x-[0%]'} right-0`}>

              {/* heading */}

              <h1 className='font-bold text-white text-center text-4xl tracking-wider'>Hello Friend!</h1>

              {/* tagline */}
              <div className='flex flex-col gap-y-2 items-center justify-center my-4'>

                <p className='font-light text-white text-lg text-center'>Enter your personal details and start journey with us</p>

              </div>

              {/* Sign in button */}

              <button type='button' className='border border-white bg-transparent text-[#FFFFFF] text-lg font-semibold py-[12px] px-[45px] tracking-[1px] uppercase transition-transform duration-100 ease-in active:transform active:scale-95 focus:outline-none rounded-[20px]' onClick={toggleClassHandler}>Sign up</button>

            </div>

          </div>

        </div>

      </div>

    </Modal>
  )
}

export default Auth