import React from 'react'

const NewPostButton = ({setOpen}) => {
  return (
    <div>
      <button onClick={()=>setOpen(true)} className="  bg-amber-900 text-white text-nowrap py-3 px-5 rounded-3xl opacity-85 fixed bottom-8 left-7 hover:bg-amber-800 active:bg-amber-700 active:shadow-md">New Post</button>
    </div>
  )
}

export default NewPostButton