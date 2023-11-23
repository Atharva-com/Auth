import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../../Firebase/Firebase';
import { useDispatch } from 'react-redux';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from '../../redux/user/userSlice';
import { RotatingLines } from 'react-loader-spinner';
const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = React.useRef();
  const [image, setImage] = useState(undefined)
  const [imagePercent, setImagePercent] = useState(0)
  const [imageError, setImageError] = useState(false)
  const [formData, setFormData] = useState({})
  const [updateSuccess, setUpdateSuccess] = useState(false)

  useEffect(() => {
    if (image) {
      handleFileUpload(image)
    }
  }, [image])

  // Upload image to firebase storage

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setImagePercent(Math.round(progress));
    },

      (error) => {
        console.log(error)
        setImageError(true)
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, profilePicture: downloadURL })
        })
      }
    )
  }

  // On input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }
  
  // On form submit
  const handleSubmit = async (e) => {
    const token = localStorage.getItem('access_Token')
    e.preventDefault()
    const dataWithToken = {
      ...formData, // Add form data to the data
      token: token, // Add token to the data
    };

    try {

      // Dispatch update user start
      dispatch(updateUserStart());
      const res = await fetch(`http://localhost:8000/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataWithToken),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true)
    } catch (error) {
      dispatch(updateUserFailure(error));
    }

  }

  // Delete account
  const handleDeleteAccount = async () => { 

    try {
      dispatch(deleteUserStart());
      const res = await fetch(`http://localhost:8000/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      console.log(data)
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }

   }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} method='POST' className='flex flex-col gap-4'>

        {/* Image upload input */}

        <input type="file" ref={fileRef} hidden accept='image/*' onChange={(e) => {
          setImage(e.target.files[0])
        }} />

        {/* Avatar Image */}
        <img
          src={formData.profilePicture || currentUser.profilePicture}
          alt='profile'
          className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2'
          onClick={() => fileRef.current.click()}
        />

        {/* Image upload progress */}
        <p className='text-center'>
          {imageError ? (<span className='text-red-700 text-center'>Error uploading image (file size must be less than 2 MB)</span>) : (imagePercent > 0 && imagePercent < 100 ? (<span className='text-slate-700 text-center'>{`Uploading ${imagePercent}%`}</span>) : imagePercent === 100 ? (<span className='text-green-700 text-center'>Image uploaded SuccessFully</span>) : "")}
        </p>

        {/* Username Input */}
        <input
          defaultValue={currentUser.username}
          type='text'
          id='username'
          placeholder='Username'
          className='bg-slate-100 rounded-lg p-3'
          onChange={handleInputChange}
        />

        {/* Email Input */}
        <input
          defaultValue={currentUser.email}
          type='email'
          id='email'
          placeholder='Email'
          className='bg-slate-100 rounded-lg p-3'
          onChange={handleInputChange}
        />

        {/* Password Input */}
        <input
          type='password'
          id='password'
          placeholder='Password'
          className='bg-slate-100 rounded-lg p-3'
          onChange={handleInputChange}
        />

        {/* Submit Button */}
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? <RotatingLines
            strokeColor="black"
            strokeWidth="5"
            animationDuration="0.75"
            width="36"
            visible={true}
          /> : 'Update'}
        </button>

      </form>

      {/* Delete Account and Sign out */}
      <div className='flex justify-between mt-5'>

        <span
          className='text-red-700 cursor-pointer'
          onClick={handleDeleteAccount}
        >
          Delete Account
        </span>

        <span className='text-red-700 cursor-pointer'>
          Sign out
        </span>

      </div>

      <p className='text-red-700 mt-5'>{error && 'Something went wrong!'}</p>

      <p className='text-green-700 mt-5'>
        {updateSuccess && 'User is updated successfully!'}
      </p>
    </div>
  );
}

export default Profile