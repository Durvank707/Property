import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserFailure, signOutUserStart, signOutUserSuccess, updateUserFailure, updateUserStarts, updateUserSuccess, } from '../redux/user/userSlice';

const Profile = () => {

    const { currentUser, loading, error } = useSelector((state) => state.user);
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();
    const [updateSuccess, setUpdateSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(updateUserStarts());

            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            })

            const data = await res.json();

            if (data.success === false) {
                dispatch(updateUserFailure(data.message));
                return;
            }

            dispatch(updateUserSuccess(data));
            setUpdateSuccess(true);
        }
        catch (error) {
            dispatch(updateUserFailure(error.message));
        }
    }

    const handleSignOut = async () => {
        try {
            dispatch(signOutUserStart());
            const res = await fetch('/api/auth/signout');
            const data = await res.json();
            if (data.success === false) {
                dispatch(signOutUserFailure(data.message));
                return;
            }
            dispatch(signOutUserSuccess(data));
        } catch (error) {
            dispatch(signOutUserFailure(error.message));
        }
    };

    const handleDeleteUser = async () => {
        try {
            dispatch(deleteUserStart());
            const res = await fetch(`/api/user/delete/${currentUser._id}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(deleteUserFailure(data.message));
                return;
            }
            dispatch(deleteUserSuccess(data));
        } catch (error) {
            dispatch(deleteUserFailure(error.message));
        }
    };

    return (
        <div className='max-w-lg mx-auto flex flex-col my-20'>
            <h1 className='text-3xl font-semibold text-center my-8 '>Profile</h1>
            <form className=' flex flex-col gap-4' onSubmit={handleSubmit}>
                <img src={currentUser.avatar} alt='avatar' className='w-24 h-24 rounded-full self-center object-cover mt-2 cursor-pointer' />
                <input type='text' placeholder='Username' id='username' defaultValue={currentUser.username} onChange={handleChange} className='p-3 rounded-lg border' />
                <input type='email' placeholder='Email' id='email' defaultValue={currentUser.email} onChange={handleChange} className='p-3 rounded-lg border' />
                <input type='password' placeholder='Password' id='password' onChange={handleChange} className='p-3 rounded-lg border' />
                <button disabled={loading} className='p-3 bg-slate-700 rounded-lg text-white uppercase hover:opacity-90 disabled:opacity-80'>{loading ? "Loading..." : "Update"}</button>
            </form>
            <div className='flex justify-between my-4'>
                <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer font-semibold'>Delete Account</span>
                <span onClick={handleSignOut} className='text-red-700 cursor-pointer font-semibold'>Sign Out</span>
            </div>

            <p className='text-red-700 font-semibold'>{"Something went wrong !" ? error : ""}</p>
            <p className='text-green-700'>{updateSuccess ? "Profile updated !" : ""}  </p>
        </div>
    )
}

export default Profile