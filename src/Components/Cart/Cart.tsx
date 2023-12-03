import React from 'react'
import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { localStorageService } from '../../util/localStorageService'
import FoodContext from '../Provider/FoodContext'
import { IListFood } from '../type'


const Cart = ({ }) => {
  const [cartList, setCartList] = useState<IListFood[]>([])
  const [authorization, setAuthorization] = useState(false)
  const [loading, setLoading] = useState(false)
  const { formatCurrency } = useContext(FoodContext)

  const getCart = () => {
    if (localStorage.getItem('user')) {
      const user: any = localStorage.getItem('user')
      const getUser = JSON.parse(user)
      setCartList(getUser.cart)
    }
    setLoading(true)
  }
  console.log(cartList)
  const checkAuthorization = async (): Promise<Boolean> => {
    try {
      console.log(localStorage.getItem('accessToken'))
      const checkAuth = await axios.get('http://localhost:8080/auth/checkAuth/cart', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken') ?? ''
        }
      })
      if (checkAuth) {
        setAuthorization(true)
        return true
      } else return false
    } catch (err) {
      setLoading(true)
      console.log('un authorization')
      return false
    }
  }
  const handleIncreaseAmount = (cart: any, quanlity: any) => {
    localStorageService({ ...cart }, quanlity + 1)
    console.log({ ...cart })
    getCart()
  }
  const handleDecreaseAmount = (cart: any, quanlity: any, index: number) => {
    if (quanlity > 1) {
      localStorageService(cart, quanlity - 1)
    } else {
      handleDeleteItem(index);
    }
    getCart()
  }
  const handleDeleteItem = (index: number) => {
    console.log('delete')
    const user: any = localStorage.getItem('user')
    const getUser: unknown[] = (JSON.parse(user)).cart
    const getNewUser = getUser.splice(index, 0)
    console.log(JSON.parse(user))
    getUser.splice(index, 1)
    // const newUser = {
    //   cart:getNewUser.
    // 
    const newUser = (JSON.parse(user))
    newUser.cart = getUser
    console.log(newUser)
    localStorage.setItem('user', JSON.stringify(newUser))
    getCart()
  }

  // test-----
  const payment = async () => {
    const getAccessToken = localStorage.getItem('accessToken')
    const getUserInfo: any = await axios.get('http://localhost:8080/auth/profile', {
      headers: {
        Authorization: 'Bearer ' + getAccessToken ?? ''
      }
    })
    console.log(getUserInfo.data.sub)
    const sendData = {
      user: getUserInfo.data.sub || '',
      list_order_detail: cartList.map((li) => {
        return li.id
      })
    }
    console.log(sendData)
    const pay = await axios.post('http://localhost:8080/api/order/create', {
      headers: {
        Authorization: 'Bearer ' + getAccessToken ?? ''
      },
      data: sendData
    })
    console.log(pay)
    const getLocalStorage = localStorage.getItem('user') as string
    const parseCart = JSON.parse(getLocalStorage)
    console.log(parseCart)
  }
  // test-----
  const navigate = useNavigate();
  const paymentSpringboot = () => {
    const orderDetail = {
      userId: 1,
      userName: 'khang',
      phone: "0354338853",
      email: 'khangtvps26166@fpt.edu.vn',
      address: 'Ben tre',
      listFood: cartList.map((li) => ({
        foodId: li.id,
        food_name: li.food_name,
        quantity: li.quantity,
        description: li.description,
        price: li.price,
        star: li.star,
        image: li.image,
        discount: li.discount,
        category: li.category
      }))
    };
    navigate('/checkout', { state: { orderDetail } });
  };

  useEffect(() => {
    const start = async () => {
      // if(await checkAuthorization())
      getCart()
    }
    start()
  }, [])
  return (
    <>
      <div className='container mx-auto border-2 border-gray-300 rounded-xl'>
        <div className='flex flex-row'>
          <div className='basis-2/3'>
            <div className='text-3xl font-bold p-4'>Giỏ hàng của tôi</div>
            {cartList && cartList.map((cart, index) => {
              return (
                <div className='mx-2 my-4 shadow-2xl rounded-xl flex flex-row container'>
                  <Link to={`/food/detail/${cart.id}`} className='basis-2/5 mx-2'>
                    <img className='w-3/4 my-3 rounded-xl mx-auto ' src={cart.image} />
                  </Link >
                  <div className='basis-1/5 mx-2 my-9 '>
                    <div className='text-base font-semibold'> {cart.food_name}</div>
                    <div className='text-sm font-thin my-1'> Xem chi tiết</div>
                    <div className='flex flex-row mt-8 underline font-semibold'>
                      <button onClick={() => { handleDeleteItem(index) }} className='basis-1/3'>Xóa</button >
                    </div>
                  </div>
                  <div className='basis-2/5 text-right my-auto mr-4 flex flex-row '>
                    <div className='basis-2/3 mx-2 font-semibold'>
                      <button onClick={() => handleDecreaseAmount(cart, cart.quantity, index)} className='mx-2 font-lg border-2 border-black rounded-full h-8 w-8'>-</button>
                      <span className='mx-2'>{cart.quantity}</span>
                      <button onClick={() => handleIncreaseAmount(cart, cart.quantity)} className='mx-2 font-lg border-2 border-black rounded-full h-8 w-8'>+</button>
                    </div>
                    <div className='font-semibold basis-1/3 my-auto'>
                      {formatCurrency(cart.quantity * cart.price)}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className='basis-1/3 px-12 my-16 shadow-2xl rounded-xl mx-4'>
            <div className='p-2 text-2xl font-bold py-5'>
              {cartList && cartList.length} Món
            </div>
            <hr></hr>
            <div className='flex flex-row my-2'>
              <div className='basis-1/2'>
                Tổng đơn hàng
              </div>
              <div className='basis-1/2 text-right font-semibold'>
                {cartList && formatCurrency(cartList.reduce((acc, cart) => {
                  return acc + (cart.price * cart.quantity)
                }, 0))}
              </div>
            </div>
            <div className='flex flex-row my-2'>
              <div className='basis-1/2'>
                Phí giao hàng
              </div>
              <div className='basis-1/2 text-right font-semibold'>
                {formatCurrency(10000)}
              </div>
            </div>
            <div className='flex flex-row my-2'>
              <div className='basis-1/2'>
                Tổng thanh toán
              </div>
              <div className='basis-1/2 text-right font-semibold'>
                {cartList && formatCurrency(cartList.reduce((acc, cart) => {
                  return acc + (cart.price * cart.quantity)
                }, 10000))}
              </div>
            </div>
            <div className='mx-auto my-10 px-12'>
              <button className='w-full h-10 bg-red-500 text-white rounded-xl font-bold hover:bg-red-700 hover:ring hover:ring-red-800'
                onClick={paymentSpringboot}
              >Check Out</button>

            </div>
            <div className='mx-auto my-10 px-12'>
              <button className='w-full h-10 bg-red-500 text-white rounded-xl font-bold hover:bg-red-700 hover:ring hover:ring-red-800'
              >
                <Link to='/' className='align-middle text-white' >Back Home</Link>
              </button>

            </div>
          </div>
        </div>
      </div> : <div className='mx-auto my-64'>
        <div className='text-center text-lg font-semibold '>
          <div>Đăng nhập để truy cập giỏ hàng</div>
          <div className='my-4 w-48 h-10 bg-red-600 rounded-xl mx-auto'>
            <Link to='/login' className='align-middle text-white' >Login</Link>

          </div>
        </div>
      </div>
    </>
  )
}

export default Cart