import React, { useState } from 'react'
import { FaFacebookF } from 'react-icons/fa'
import { FaGoogle } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'
import useAuthModal from '../../helpers/UseAuthModal'
import { RotatingLines } from 'react-loader-spinner'
const Signup = ({ toggleClass, toggleClassHandler }) => {

    const [SignUp, setSignUp] = useState({ username: '', email: '', password: '' })
    const [InvalidEmail, setInvalidEmail] = useState(false)
    const [InvalidPassword, setInvalidPassword] = useState(false)
    const [Error, setError] = useState(false)
    const [Loading, setLoading] = useState(false)
    const { onClose } = useAuthModal()

    const handleInputChange = (e) => {
        setSignUp({ ...SignUp, [e.target.name]: e.target.value })
    }

    // Email Validation Function

    const validEmail = (email) => {
        const emailRegex = /^[A-Z0-9,_%+-]+@[A-Z0-9,-]+\.[A-Z]{2,}$/i
        return emailRegex.test(email)
    }

    // Credentials SignUp Function

    const handleSubmit = async (e) => {
        if(!validEmail(SignUp.email)) {
            setInvalidEmail(true)
            return
        }
        if (SignUp.username.length < 3) {
            alert('Username must be at least 3 characters long')
        } else if (SignUp.password.length < 4) {
            setInvalidPassword(true)
            alert('Password must be at least 4 characters long')
        } else if (SignUp.password.includes(" ")) {
            setInvalidPassword(true)
            alert('Password cannot contain spaces')
        } else {

            e.preventDefault()

            try {

                setLoading(true)
                setError(false)
                const response = await fetch('http://localhost:8000/api/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(SignUp)

                })
                const data = await response.json()
                setLoading(false)
                if (data.success === false) {
                    setError(true)
                    return
                }

                console.log(data)
                setSignUp({ username: '', email: '', password: '' })
                toggleClassHandler()
                console.log(SignUp)

            } catch (error) {

                setLoading(true)
                setError(true)

            }

        }
    }

    return (
        <>

            {/* Sign up */}

            <div className={`w-1/2 p-10 bg-white h-full absolute top-0 transition-all ease-in-out duration-700 ${toggleClass ? 'transform translate-x-[100%] opacity-100 z-[5] animation-show' : 'opacity-0 z-[1] left-0'}`}>

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

                <form action="" method='POST' onSubmit={handleSubmit} className='flex items-center justify-center flex-col gap-y-4'>

                    {/* Username */}

                    <div className='flex items-center justify-center w-full'>

                        <div className='text-[1rem] relative w-3/4'>

                            <input type="text" id='username' name='username' value={SignUp.username} required className='text-black p-4 border border-black rounded-[10px] transition duration-150 font-medium w-full bg-gray-50' onChange={handleInputChange} />

                            <label htmlFor="username" className='absolute top-4 left-4 text-black font-normal transition duration-150 text-lg'>username</label>

                        </div>

                    </div>

                    {/* Email Sign up */}

                    <div className='flex items-center justify-center w-full'>

                        <div className='text-[1rem] relative w-3/4'>

                            <input type="email" id='email' name='email' value={SignUp.email} required className={`text-black p-4 border rounded-[10px] transition duration-150 font-medium w-full bg-gray-50 ${InvalidEmail ? 'border-red-500' : 'border-black'}`} onChange={handleInputChange} />

                            <label htmlFor="email" className='absolute top-4 left-4 text-black font-normal transition duration-150 text-lg'>Email</label>

                        </div>

                    </div>

                    {/* Sign up password */}

                    <div className='flex items-center justify-center w-full'>

                        <div className='text-[1rem] relative w-3/4'>

                            <input type="password" id='password' name='password' value={SignUp.password} required className={`text-black p-4 border rounded-[10px] transition duration-150 font-medium w-full bg-gray-50 ${InvalidPassword ? 'border-red-500' : 'border-black'}`} onChange={handleInputChange} />

                            <label htmlFor="password" className='absolute top-4 left-4 text-black font-normal transition duration-150 text-lg'>Password</label>

                        </div>

                    </div>

                    {/* Sign up button */}

                    <button disabled={Loading} type='submit' className='border border-[#FF4B2B] bg-[#FF4B2B] text-[#FFFFFF] text-lg font-semibold py-[12px] px-[45px] tracking-[1px] uppercase transition-transform duration-100 ease-in active:transform active:scale-95 focus:outline-none rounded-[20px]'>{Loading ? <RotatingLines
                        strokeColor="black"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="36"
                        visible={true}
                    /> : 'Sign up'}</button>

                    {Error && <p className='text-red-500 pb-4'>Something went wrong !</p>}

                </form>

                <button
                    className="text-purple-900 hover:text-purple-800 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:outline-none" aria-label="Close" onClick={() => onClose()}
                >
                    <IoMdClose />
                </button>

            </div>

        </>
    )
}

export default Signup