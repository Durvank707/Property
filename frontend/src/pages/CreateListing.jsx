import React, { useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';

const CreateListing = () => {

    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({ imageUrls: [] })

    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);

    const handleImageSubmit = (e) => {
        if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
            setUploading(true);
            setImageUploadError(false);
            const promises = [];

            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]));
            }
            Promise.all(promises)
                .then((urls) => {
                    setFormData({
                        ...formData,
                        imageUrls: formData.imageUrls.concat(urls),
                    });
                    setImageUploadError(false);
                    setUploading(false);
                })
                .catch((err) => {
                    setImageUploadError('Image upload failed (2 mb max per image)');
                    setUploading(false);
                });
        } else {
            setImageUploadError('You can only upload 6 images per listing');
            setUploading(false);
        }
    };

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                }
            );
        });
    };

    const handleRemoveImage = (index) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_, i) => i !== index),
        });
    };

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
                            <input type='number' id='discountPrice' required className='p-3 rounded-lg border-gray-300 border' />
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
                        <input onChange={(e) => setFiles(e.target.files)} type='file' className='w-full rounded p-3 border border-gray-300' id='images' accept='image/*' multiple />
                        <button disabled={uploading} onClick={handleImageSubmit} className='p-3 rounded-lg border bg-blue-500 text-white uppercase hover:opacity-90 disabled:opacity-80'>{uploading ? 'Uploading...' : 'Upload'}</button>
                    </div>
                    <p className='text-red-700 text-sm'>
                        {imageUploadError && imageUploadError}
                    </p>
                    {formData.imageUrls.length > 0 &&
                        formData.imageUrls.map((url, index) => (
                            <div key={url} className='flex justify-between p-3 border items-center'>
                                <img src={url} alt='listing_image' className='w-30 h-20 object-contain rounded-lg ' />
                                <div className='w-20 h-10 bg-red-700 text-center rounded-md hover:opacity-80'>
                                    <button type='button' onClick={() => handleRemoveImage(index)} className='p-2 text-white rounded-lg uppercase hover:opacity-90'>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                    <button type='button' className='p-3 rounded-lg border bg-slate-700 text-white uppercase hover:opacity-90 disabled:opacity-80'>Create Listing</button>
                </div>
            </form>
        </div>
    )
}

export default CreateListing