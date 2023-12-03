import React from 'react'
import { inputProps } from './type'

const InputComponent = ({ input }: any) => {
    const handleInput = (e: any) => {
        if (input.getInput) {
            input.getInput(e.target.value)
        }
    }
    return (
        <input className='w-80 h-8 rounded-lg underline border-2 border-gray-500 my-2 p-2'
            type={input.type} placeholder={input.placeholder} onChange={handleInput}

        />
    )
}

export default InputComponent