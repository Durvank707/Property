import React from 'react'
import { FaSearch } from "react-icons/fa"
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'

const Navbar = () => {

    const { currentUser } = useSelector((state) => state.user)

    return (
        <div className='bg-slate-200 shadow-md'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3 '>
                <Link to='/'>
                    <h1 className='font-bold text-xl sm:text-3xl flex flex-wrap'>
                        <span className='text-slate-500'>Rent</span>
                        <span className='text-slate-700'>IT</span>
                    </h1>
                </Link>
                <div className='flex gap-5'>
                    <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
                        <input type='text' placeholder='Search here...' className='bg-transparent focus:outline-none w-24 sm:w-64' />
                        <FaSearch />
                    </form>
                    <ul className='flex gap-4 items-center'>
                        <Link to="/">
                            <li className='hidden sm:inline hover:underline text-slate-700'>Home</li>
                        </Link>
                        <Link to="/about">
                            <li className='hidden sm:inline hover:underline text-slate-700'>About</li>
                        </Link>
                        <Link to="/profile">
                            {currentUser ? (
                                <img
                                    className='rounded-full h-7 w-7 object-cover'
                                    src={currentUser.avatar}
                                    alt='profile'
                                />
                            ) : (
                                <li className=' text-slate-700 hover:underline'> Sign in</li>
                            )}
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar