import React from 'react'
import { Link } from 'react-router-dom'

const AdminNavBar = () => {
  return (
    <div className='h-96 bg-gray-700 text-white flex flex-col font-semibold'>
      <div className='basis-1/5  w-full ml-2'>
        <Link to='' className='my-6'>Admin Role</Link>
      </div>
      <div className='basis-1/5  w-full ml-2'>
        <Link to='category' className='my-6'>Admin Category</Link>
      </div>
      <div className='basis-1/5  w-full ml-2'>
        <Link to='food' className='my-6'>Admin Food</Link>
      </div>
      <div className='basis-1/5  w-full ml-2'>
        <div className='my-6'>Admin Status</div>
      </div>
      <div className='basis-1/5  w-full ml-2'>
        <Link to='order' className='my-6'>Admin Order</Link>
      </div>
      <div className='basis-1/5  w-full ml-2'>
        <div className='my-6'>Thống kê</div>
      </div>
    </div>
  )
}

export default AdminNavBar