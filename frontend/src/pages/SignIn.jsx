import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';

const SignIn = () => {
    const dispatch = useDispatch();
    const {loading, error} = useSelector((state)=>state.user);
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    const changeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(signInStart())
            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            console.log(data);
            if (data.success === false) {
                dispatch(signInFailure(data.message))
                return;
            }
            dispatch(signInSuccess(data))
            navigate('/');
        } catch (error) {
            dispatch(signInFailure(error.message))
            console.log("error: ", error)
        }
    };

    return (
        <div className='p-3 max-w-lg mx-auto my-24'>

            <h1 className='text-center text-3xl font-semibold my-7'>Sign Up</h1>
            <form className='flex flex-col gap-4' onSubmit={submitHandler}>
                <input type='email' placeholder='Email' id='email' className='border p-3 rounded-lg' onChange={changeHandler} />
                <input type='password' placeholder='Password' id='password' className='border p-3 rounded-lg' onChange={changeHandler} />
                <button className='disabled:{loading} bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 mt-4'>{loading ? "Loading..." : "Sign In"}</button>
            </form>
            <div className='flex gap-2 mt-6'>
                <p>Dont have an account?</p>
                <Link to={"/signup"}>
                    <span className='text-blue-700 font-semibold'>Sign Up</span>
                </Link>
            </div>
            <div>
                {error && <p className='text-red-500 mt-2'>User not found</p>}
            </div>
        </div>
    )
}

export default SignIn