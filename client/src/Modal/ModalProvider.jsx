import React from 'react'
import { useEffect, useState } from "react";
import Auth from '../Components/Auth/Auth';
const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }
    
  return (

    <>

        <Auth />

    </>

  )
}

export default ModalProvider