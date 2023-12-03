import { useParams } from "react-router"
import { useContext, useEffect, useState } from "react"
import FoodContext from "../Provider/FoodContext"
import { IListFood } from "../type"
import axios from "axios"
import { localStorageService } from "../../util/localStorageService"
import { log } from "console"
import { toast } from 'react-toastify';

const FoodDetailComponent = () => {
  const { id } = useParams<string>()
  const [amount, setAmount] = useState(1)
  const [food, setFood] = useState<IListFood>()
  const { formatCurrency } = useContext(FoodContext)
  const getItem = async () => {
    const item = await axios.get(`http://localhost:8080/api/food/${id}`)
    setFood(item.data)
    console.log("item", item);

  }
  const handleSubmit = (e: any, food: IListFood) => {
    localStorageService(food, amount)
    toast.success("Add Success !");
  }
  useEffect(() => {
    getItem()
    const user: any = localStorage.getItem('user')
    // console.log(user.accessToken)
  }, [])
  return (
    <div className='flex flex-grow container mx-auto'>
      <div className='basis-1/2'>
        {food ? <img className='rounded-xl my-2 w-5/6 mx-auto' src={food.image} /> : ''}
      </div>
      {food ? <div className='basis-1/2 '>
        <div className='mx-auto shadow-2xl shadow-slate-400 rounded-lg h-full p-10 pt-12'>
          <div className='text-3xl font-bold'>
            Combo tưng bừng
          </div>
          <div className='text-lg font-base my-2'>
            {food.food_name}
          </div>
          <div className='border-2 border-white my-4'></div>
          <div className='text-2xl font-bold'>
            Món của bạn
          </div>
          <div className='text-lg font-base my-2'>
            {food.description}
          </div>
          <div className='border-2 border-white my-6'></div>
          <div className='flex flex-row'>
            <div className='basis-1/3 my-auto'>
              <button className="w-8 h-8 rounded-full"
                onClick={() => setAmount((prev) => {
                  if (prev == 0) {
                    return 0
                  } else return prev - 1
                })} >
                <span className='text-2xl font-bold w-full h-full'>-</span></button>
              <span className="w-1/3 h-8 text-2xl mx-2 py-auto">{amount}</span>
              <button className="w-8 h-8 rounded-full"
                onClick={() => setAmount(amount + 1)}>
                <span className='text-2xl font-bold w-full h-full'>+</span></button>
            </div>
            <div className='basis-2/3 text-center '>
              <button className='w-full h-10 bg-red-600 rounded-2xl text-lg font-bold text-white'
                onClick={(e) => handleSubmit(e, food)}
              >Thêm vào giỏ ( {formatCurrency(Number(food.price - food.discount * food.price) * amount)} ) </button>
            </div>
          </div>
        </div>
      </div>
        : ''}
    </div>
  )
}

export default FoodDetailComponent