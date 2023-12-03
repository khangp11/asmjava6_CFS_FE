import React from 'react'
import { Route, Routes } from 'react-router'
import Layout from '../Layout'
import AdminComponent from './Admin/AdminComponent'
import Cart from './Cart/Cart'
import FoodDetailComponent from './Food/FoodDetailComponent'
import LayoutChildren from './LayoutChildren'
import Login from './Login'
import MenuComponent from './Menu/MenuComponent'
import SignUp from './SignUp'
import Checkout from './Cart/Checkout'
import HistoryOrderComponent from './History/HistoryOrderComponent'
const UserDashboard = () => {
  return (
    <div>
      <Layout>
        <Routes>
          <Route path='login' element={<Login />} />
          <Route path='' element={<MenuComponent />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='cart' element={<Cart />} />
          <Route path='food/detail/:id' element={<FoodDetailComponent />} />
          {/* <Route path='/admin' element={<AdminComponent />} /> */}
          <Route path='checkout' element={<Checkout />} />
          <Route path='history' element={<HistoryOrderComponent />} />
        </Routes>
      </Layout>
    </div>
  )
}

export default UserDashboard