import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => {

  const {currentUser} = useSelector(state => state.user)
  return (
    <div>{currentUser ? <img src={currentUser.user.profilePicture} alt="" className='h-10 w-10 cursor-pointer rounded-full object-cover' /> : 'Home'}</div>
  )
}

export default Home