import React from 'react'
import { Route, Routes } from 'react-router'
import AdminComponent from './AdminComponent'
import CaregoryComponent from './CategoryComponent'
import FoodComponent from './FoodComponent'

const AdminRouter = () => {
  return (
    <Routes>
      <Route path='/admin/food' element={<FoodComponent />} />
      <Route path='/admin/category' element={<CaregoryComponent />} />
    </Routes>
  )
}

export default AdminRouter