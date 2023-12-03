import {useState,useEffect, Children} from 'react'
import axios from 'axios'
import FoodContext from './FoodContext'
import {IListFood} from '../type'
import App from '../../App'
const FoodProvider = ({children}:any) => {
    const [listFood, setListFood] = useState<IListFood[]>([])
    const getListFood = async()=>{
        try{
            const getListData = await axios.get('http://localhost:8080/api/food')
            setListFood(getListData.data)
        }catch(err){
            console.log(err)
        }
    }
    const formatCurrency = (amount : number, locale = 'vi-VN')=> {
        const formatter = new Intl.NumberFormat(locale, {
          style: 'currency',
          currency: 'VND',
        });
      
        return formatter.format(amount);
      }
    useEffect(()=>{
        getListFood()
    },[])
  return (
    <>
    <FoodContext.Provider value={{listFood,formatCurrency}}>
        {children}
    </FoodContext.Provider>
    </>
  )
}

export default FoodProvider