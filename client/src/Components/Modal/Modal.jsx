import React from 'react'
import * as Dialog from '@radix-ui/react-dialog';
import { IoMdClose } from 'react-icons/io';

const Modal = ({
  isOpen,
  onChange,
  children
}) => {
  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} className='relative z-100'>
      
      <Dialog.Portal>

        <Dialog.Overlay 
          className="fixed inset-0 z-[100] backdrop-blur-sm" 
        />

        <Dialog.Content
          className="fixed z-[100] drop-shadow-md border-2 border-neutral-700 top-[50%] left-[50%] max-h-full h-full md:h-auto md:max-h-[90vh] w-full md:w-[70vw]  translate-x-[-50%] translate-y-[-50%] rounded-md bg-opacity-50 focus:outline-none">

            {children}

          {/* <Dialog.Close asChild> */}

            {/* <button
              className="text-purple-900 hover:text-purple-800 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:outline-none" aria-label="Close"
            >
              <IoMdClose />
            </button> */}

          {/* </Dialog.Close> */}

        </Dialog.Content>

      </Dialog.Portal>

    </Dialog.Root>
  )
}

export default Modal