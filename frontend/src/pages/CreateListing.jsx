import React from 'react'

const CreateListing = () => {
    return (
        <div className='p-3 max-w-5xl mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-14'>Create a Listing</h1>
            <form className='flex flex-col sm:flex-row gap-7'>
                <div className='flex flex-col gap-4 flex-1'>
                    <input type='text' placeholder='Name' id='name' required maxLength='60' minLength='10' className='p-3 rounded-lg border' />
                    <textarea type='text' placeholder='Description' id='description' required className='p-3 rounded-lg border' />
                    <input type='text' placeholder='Address' id='address' required className='p-3 rounded-lg border' />
                    <div className='flex flex-wrap gap-6'>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='sell' className='w-5' />
                            <span>Sell</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='rent' className='w-5' />
                            <span>Rent</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='parking' className='w-5' />
                            <span>Parking Spot</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='furnished' className='w-5' />
                            <span>Furnished</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='other' className='w-5' />
                            <span>Other</span>
                        </div>
                    </div>
                    <div className='flex flex-wrap gap-9    '>
                        <div className='flex items-center gap-2'>
                            <input type='number' id='bedroom' required max='10' min='1' className='p-3 rounded-lg border-gray-300 border' />
                            <span>Bedroom</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input type='number' id='batthroom' required max='10' min='1' className='p-3 rounded-lg border-gray-300 border' />
                            <span>Bathroom</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input type='number' id='regularPrice' required className='p-3 rounded-lg border-gray-300 border' />
                            <div className='flex flex-col text-center'>
                                <span>Regular Price</span>
                                <span className='text-xs'> ($/Month)</span>
                            </div>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input type='number' id='discountPrice' required  className='p-3 rounded-lg border-gray-300 border' />
                            <div className='flex flex-col text-center'>
                                <span>Discount Price</span>
                                <span className='text-xs'> ($/Month)</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col flex-1 gap-4'>
                    <p className='font-semibold'>
                        Images:
                        <span className='font-normal text-gray-600 ml-2'>
                            The first image will be the cover (max 6)
                        </span>
                    </p>
                    <div className='flex gap-4'>
                        <input type='file' className='w-full rounded p-3 border border-gray-300' id='images' accept='image/*' multiple />
                        <button className='p-3 rounded-lg border bg-blue-500 text-white uppercase hover:opacity-90 disabled:opacity-80'>upload</button>
                    </div>
                    <button className='p-3 rounded-lg border bg-slate-700 text-white uppercase hover:opacity-90 disabled:opacity-80'>Create Listing</button>
                </div>
            </form>
        </div>
    )
}

export default CreateListing