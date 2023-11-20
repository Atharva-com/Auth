import React, {useState} from 'react'
import { FaFacebookF } from 'react-icons/fa'
import { FaGoogle } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'
import useAuthModal from '../../helpers/UseAuthModal'
import { useNavigate } from 'react-router-dom'
import { signInStart, signInFailure, signInSuccess } from '../../redux/user/userSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
const SignIn = ({toggleClass}) => {

    const dispatch = useDispatch()
    const [SignIn, setSignIn] = useState({email: '', password:''})
    const { Loading, Error } = useSelector(state => state.user)
    const {onClose} = useAuthModal()
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        setSignIn({...SignIn, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            dispatch(signInStart())
            const response = await fetch('http://localhost:8000/api/auth/signin', SignIn)
            const data = await response.json()
            
            if (data.success === false) {
                dispatch(signInFailure(data))
                return
            }
            dispatch(signInSuccess(data))
            onClose()
            navigate('/')
            console.log(data)
            setSignIn({ email: '', password: '' })
            console.log(SignIn)

        } catch (error) {

            dispatch(signInFailure(error))

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

                        <div className='rounded-[50%] border border-[#DDDDDD] flex items-center justify-center w-[40px] h-[40px] p-[0.8rem] cursor-pointer hover:border-black transition-all'>
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

                            <input type="email" id='email' name='email' value={SignIn.email} onChange={handleInputChange} required className='text-black p-4 border border-black rounded-[10px] transition duration-150 font-medium w-full bg-gray-50' />

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

                    <button type='button' className='border border-[#FF4B2B] bg-[#FF4B2B] text-[#FFFFFF] text-lg font-semibold py-[12px] px-[45px] tracking-[1px] uppercase transition-transform duration-100 ease-in active:transform active:scale-95 focus:outline-none rounded-[20px]'>{Loading ? '' : 'Sign in'}</button>

                    {Error && <p className='text-red-500 pb-4'>{Error.message || 'Something went wrong !'}</p>}

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