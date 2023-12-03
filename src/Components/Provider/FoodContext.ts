import {createContext} from 'react'
import { IListFood } from '../type';

const FoodContext = createContext<null|IListFood[]|any> ( null);

export default FoodContext