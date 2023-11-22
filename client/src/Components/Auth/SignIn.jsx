import React, { useState } from 'react'
import { FaFacebookF } from 'react-icons/fa'
import { FaGoogle } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'
import useAuthModal from '../../helpers/UseAuthModal'
import { useNavigate } from 'react-router-dom'
import { signInStart, signInFailure, signInSuccess } from '../../redux/user/userSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { RotatingLines } from 'react-loader-spinner'
import { GoogleAuthProvider, signInWithPopup, getAuth } from '@firebase/auth'
import { app } from '../../Firebase/Firebase'
const SignIn = ({ toggleClass }) => {

    const dispatch = useDispatch()
    const [SignIn, setSignIn] = useState({ email: '', password: '' })
    const [InvalidEmail, setInvalidEmail] = useState(false)
    const { loading, error } = useSelector(state => state.user)
    const { onClose } = useAuthModal()
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        setSignIn({ ...SignIn, [e.target.name]: e.target.value })
    }

    // Email Validation Function

    const validEmail = (email) => {
        const emailRegex = /^[A-Z0-9,_%+-]+@[A-Z0-9,-]+\.[A-Z]{2,}$/i
        return emailRegex.test(email)
    }

    // Credentials SignIn Function

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!validEmail(SignIn.email)) {
            setInvalidEmail(true)
            return
        }
        try {

            dispatch(signInStart())
            const response = await fetch('http://localhost:8000/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(SignIn)

            })
            const data = await response.json()
            console.log(data)
            if (data.success === false) {
                dispatch(signInFailure(data))
                return
            }
            dispatch(signInSuccess(data))
            onClose()
            navigate('/')
            setSignIn({ email: '', password: '' })

        } catch (error) {

            dispatch(signInFailure(error))

        }
    }

    // Google SignIn Function

    const handleGoogleAuth = async () => {
        try {
            const auth = getAuth(app)
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)
            const res = await fetch('http://localhost:8000/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                })
            })
            const data = await res.json()
            console.log(data)
            dispatch(signInSuccess(data))
            onClose()
            navigate('/')

        } catch (error) {
            console.log(error)
        }
    }

    return (

        <>
            {/* Sign in */}

            <div className={`w-1/2 absolute left-0 top-0 z-[2] p-10 bg-white h-full transition-all ease-in-out duration-700 ${toggleClass ? 'transform translate-x-[100%]' : ''}`}>

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

                        <div className='rounded-[50%] border border-[#DDDDDD] flex items-center justify-center w-[40px] h-[40px] p-[0.8rem] cursor-pointer hover:border-black transition-all' onClick={handleGoogleAuth} >
                            <FaGoogle />
                        </div>

                    </div>

                    <p className='font-light text-gray-800 text-lg'>or use your credentials</p>

                </div>

                {/* Sign in form */}

                <form action="" method='POST' onSubmit={handleSubmit} className='flex items-center justify-center flex-col gap-y-4'>

                    {/* Email Sign in */}

                    <div className='flex items-center justify-center w-full'>

                        <div className='text-[1rem] relative w-3/4'>

                            <input type="email" id='email' name='email' value={SignIn.email} onChange={handleInputChange} required className={`text-black p-4 border rounded-[10px] transition duration-150 font-medium w-full bg-gray-50 ${InvalidEmail ? 'border-red-500' : 'border-black'}`} />

                            <label htmlFor="email" className='absolute top-4 left-4 text-black font-normal transition duration-150 text-lg'>Email</label>

                        </div>

                    </div> 

                    {/* Sign in Password */}

                    <div className='flex items-center justify-center w-full'>

                        <div className='text-[1rem] relative w-3/4'>

                            <input type="password" id='password' name='password' value={SignIn.password} onChange={handleInputChange} required className='text-black p-4 border border-black rounded-[10px] transition duration-150 font-medium w-full bg-gray-50' />

                            <label htmlFor="password" className='absolute top-4 left-4 text-black font-normal transition duration-150 text-lg'>Password</label>

                        </div>

                    </div>

                    {/* Forgot Password */}
                    <div className='flex items-center justify-center w-full'>
                        <p className='text-gray-800 font-light text-lg cursor-pointer'>Forgot your password?</p>
                    </div>

                    {/* Sign in button */}

                    <button type='submit' className='border border-[#FF4B2B] bg-[#FF4B2B] text-[#FFFFFF] text-lg font-semibold py-[12px] px-[45px] tracking-[1px] uppercase transition-transform duration-100 ease-in active:transform active:scale-95 focus:outline-none rounded-[20px]'>
                        {loading ? <RotatingLines
                            strokeColor="black"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="36"
                            visible={true}
                        /> : 'Sign in'}</button>

                    {error && <p className='text-red-500 pb-4'>{error.message || 'Something went wrong !'}</p>}

                </form>

                <button
                    className="text-purple-900 hover:text-purple-800 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:outline-none" onClick={() => onClose()}
                >
                    <IoMdClose />
                </button>

            </div>
        </>

    )
}

export default SignIn