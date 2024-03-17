import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {

    const { currentUser } = useSelector((state) => state.user);

    return (
        <div className='max-w-lg mx-auto flex flex-col my-20'> 
            <h1 className='text-3xl font-semibold text-center my-8 '>Profile</h1>
            <form className=' flex flex-col gap-4'>
                <img src={currentUser.avatar} alt='avatar' className='w-24 h-24 rounded-full self-center object-cover mt-2 cursor-pointer' />
                <input type='text' placeholder='Username' id='username' className='p-3 rounded-lg border' />
                <input type='email' placeholder='Email' id='email' className='p-3 rounded-lg border' />
                <input type='text' placeholder='Password' id='password' className='p-3 rounded-lg border' />
                <button className='p-3 bg-slate-700 rounded-lg text-white uppercase hover:opacity-90 disabled:opacity-80'>Update</button>
            </form>
            <div className='flex justify-between my-4'>
                <span className='text-red-700 cursor-pointer'>Delete Account</span>
                <span className='text-red-700 cursor-pointer'>Sign Out</span>
            </div>
        </div>
    )
}

export default Profile