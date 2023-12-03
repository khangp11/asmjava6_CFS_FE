import { StringifyOptions } from "querystring"

export interface inputProps {
    name: string,
    placeholder: string,
    getInput: any,
    type:string
}
export interface IListFood{
    _id:string,
    food_name:string,
    quantity:number,
    description:string,
    star:number,
    image:string,
    discount:number,
    category:any,
    price:number,
    id?:string
}