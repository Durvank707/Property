import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"

const SignUp = () => {

    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
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
            setLoading(true);
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            console.log(data);
            if (data.success === false) {
                setLoading(false);
                setError(data.message);
                return;
            }
            setLoading(false);
            setError(null);
            navigate('/signin');
        } catch (error) {
            setLoading(false);
            setError(error.message);
            console.log("error: ",error)
        }
    };

    return (
        <div className='p-3 max-w-lg mx-auto my-24'>

            <h1 className='text-center text-3xl font-semibold my-7'>Sign Up</h1>
            <form className='flex flex-col gap-4' onSubmit={submitHandler}>
                <input type='text' placeholder='Username' id='username' className='border p-3 rounded-lg' onChange={changeHandler} />
                <input type='email' placeholder='Email' id='email' className='border p-3 rounded-lg' onChange={changeHandler} />
                <input type='password' placeholder='Password' id='password' className='border p-3 rounded-lg' onChange={changeHandler} />
                <button className='disabled:{loading} bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 mt-4'>{loading ? "Loading..." : "Sign Up"}</button>
            </form>
            <div className='flex gap-2 mt-6'>
                <p>Dont have an account?</p>
                <Link to={"/signin"}>
                    <span className='text-blue-700 font-semibold'>Sign In</span>
                </Link>
            </div>
            <div>
                {error && <p className='text-red-500 mt-2'>Something went wrong!</p>}
            </div>
        </div>
    )
}

export default SignUp