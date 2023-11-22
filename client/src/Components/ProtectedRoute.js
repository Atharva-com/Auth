import React, {useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Outlet } from 'react-router-dom'
import useAuthModal from '../helpers/UseAuthModal'

const ProtectedRoute = () => {

    const {currentUser} = useSelector(state => state.user)
    const { onOpen } = useAuthModal()
    const navigate = useNavigate();

  useEffect(() => {

    if (!currentUser) {
      onOpen();
    }
  }, [currentUser, navigate]);

  return currentUser ? <Outlet /> : null
}

export default ProtectedRoute