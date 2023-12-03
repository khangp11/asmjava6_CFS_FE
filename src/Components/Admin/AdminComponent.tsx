import React from 'react'
import { Route, Routes } from 'react-router'
import AdminNavBar from './AdminNavBar'
import AdminRouter from './AdminRouter'
import CaregoryComponent from './CategoryComponent'
import FoodComponent from './FoodComponent'

const AdminComponent = () => {
  return (
    <>
      <div className='flex flex-row'>
        <div className='basis-1/5'>
          <AdminNavBar />
        </div>
        <div className='basis-4/5'>
          <AdminRouter />
          ok
        </div>
      </div>


    </>

  )
}

export default AdminComponent