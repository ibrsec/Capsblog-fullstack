import React, { useState } from 'react'
import useBlogServices from '../../../services/useBlogServices';
import EditBlogModal from './EditBlogModal';

const EditDeleteBlog = ({blogId, blog}) => {
    const {  deleteBlogApi } = useBlogServices();
    const [editModalOpen, setEditModalOpen] = useState(false);
  return (
    <div className=' flex flex-col w-[200px] gap-2'>
        <button  onClick={()=>setEditModalOpen(true)} className='text-white py-2 ps-20 pe-10 bg-blue-500 rounded-s-full'>Edit</button>
        <button onClick={()=>deleteBlogApi(blogId)} className='text-white py-2 ps-20 pe-10 bg-red-500 rounded-s-full'>Delete</button> 
        <EditBlogModal open={editModalOpen} setOpen={setEditModalOpen} blog={blog}/>
    </div>
  )
}

export default EditDeleteBlog