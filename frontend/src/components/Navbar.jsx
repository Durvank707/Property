import React from 'react'
import {FaSearch} from "react-icons/fa"
import {Link} from "react-router-dom"

const Navbar = () => {
    return (
        <div className='bg-slate-200 shadow-md'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3 '>
                <Link to='/'>
                <h1 className='font-bold text-xl sm:text-3xl flex flex-wrap'>
                    <span className='text-slate-500'>Rent</span>
                    <span className='text-slate-700'>IT</span>
                </h1>
                </Link>
                <div className='flex gap-10'>
                    <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
                        <input type='text' placeholder='Search here...' className='bg-transparent focus:outline-none w-24 sm:w-64'/>
                        <FaSearch/>
                    </form>
                    <ul className='flex gap-4 items-center'>
                        <Link to="/">
                        <li className='hidden sm:inline hover:underline text-slate-700'>Home</li>
                        </Link>
                        <Link to="/about">
                        <li className='hidden sm:inline hover:underline text-slate-700'>About</li>
                        </Link>
                        <Link to="/signin">
                        <li className=' hover:underline text-slate-700'>Sign In</li>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar