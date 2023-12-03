import React from 'react'
import { Route, Routes } from 'react-router'
import FoodComponent from './Admin/FoodComponent'
import CategoryComponent from './Admin/CategoryComponent'
import OrderComponent from './Admin/OrderComponent'
import StatisticalComponent from './Admin/StatisticalComponent'
const AdminDashboard = () => {
  return (
    <div>
      <Routes>
        {/* <Route path='' element={<AdminComponent />} /> */}
        {/* <Route path='' element={<AdminNavBar />} /> */}
        <Route path='category' element={<CategoryComponent />} />
        <Route path='food' element={<FoodComponent />} />
        <Route path='order' element={<OrderComponent />} />
        <Route path='statistical' element={<StatisticalComponent />} />

      </Routes>
    </div>
  )
}

export default AdminDashboard