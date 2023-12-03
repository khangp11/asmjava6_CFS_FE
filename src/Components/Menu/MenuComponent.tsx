import axios from 'axios'
import { useState, useEffect, createContext, useContext } from 'react'
import { Link } from 'react-router-dom'
import { localStorageService } from '../../util/localStorageService'
import FoodContext from '../Provider/FoodContext'
import { IListFood } from '../type'
import { toast } from 'react-toastify';
const MenuComponent = () => {
    const [listFood, setListFood] = useState<IListFood[]>([])
    const { formatCurrency } = useContext(FoodContext)
    const getListFood = async () => {
        try {
            const getListData = await axios.get('http://localhost:8080/api/food')
            setListFood(getListData.data)
        } catch (err) {
            console.log(err)
        }
    }
    const handleAddToCart = (food: IListFood) => {
        localStorageService(food, 1)
        toast.success("Add Success !")
    }
    useEffect(() => {
        getListFood()
    }, [])
    console.log(listFood)
    return (
        <div className='container mx-auto'>
            <div className=' grid grid-cols-4 gap-8'>
                {listFood ? listFood.map((food) => {
                    return (
                        <div key={food._id} className='col-auto shadow-lg rounded-lg shadow-gray-400 p-2'>
                            <Link to={`/food/detail/${food._id || food.id}`}>
                                <div>
                                    <img className='rounded-lg my-2' src={food.image} />
                                </div>
                            </Link>
                            <div className='my-2 text-base font-semibold flex flex-row'>
                                <div className='basis-3/5'>
                                    {food.food_name}
                                </div>
                                <div className='basis-2/5 text-right '>
                                    <div >

                                        {formatCurrency(food.price - (food.discount * food.price))}
                                    </div>
                                    <div className='text-gray-300'>
                                        {formatCurrency(food.price)}
                                    </div>
                                </div>
                            </div>
                            <div className='h-12'>
                                {food.description}
                            </div>
                            <div className='flex flex-row font-semibold my-2'>
                                <div className='basis-1/2'>
                                    <Link to={`/food/detail/${food.id}`}>
                                        <button
                                            className='w-24 h-10 border-2 border-gray-400 rounded-3xl hover:ring hover:ring-red-600 hover:border-white hover:bg-red-500 hover:text-white'>Chi Tiết</button>
                                    </Link>
                                </div>
                                <div className='basis-1/2'>
                                    <button
                                        className='w-24 h-10 border-2 border-gray-400 rounded-3xl bg-red-600 text-white hover:ring hover:ring-red-600 hover:border-white'
                                        onClick={() => { handleAddToCart(food) }}
                                    >Thêm</button>
                                </div>
                            </div>
                        </div>
                    )
                }) : ''}
            </div>
        </div>
    )
}

export default MenuComponent