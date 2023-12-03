import axios from 'axios'
import {useEffect, useState} from 'react'

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState(0)
  const [password, setPassword] = useState('')

  const handleSignUp = async()=>{
    const userInfo = {name,email,age,password}
    const signUp = await axios.post('http://localhost:8080/api/create/user',userInfo)
    console.log(signUp.data)
    if(signUp.data){
      alert('Dang ky thanh cong')
    }
    const userInformation = {
      accessToken:signUp.data
    }
    localStorage.setItem('user',JSON.stringify(userInformation))
  }

  return (
    <div className='container mx-auto w-1/3'>
      <div className='flex flex-row'>
        <div className='basis-1/4 p-1'>
          <label/>Name:
        </div>
        <div className='basis-auto border-2 border-gray-300 rounded-xl p-1'>
          <input onChange={(e)=>setName(e.target.value)} type='text' value={name} placeholder='Name' />
        </div>
      </div>
      <div className='flex flex-row'>
        <div className='basis-1/4 p-1'>
          <label/>Email:
        </div>
        <div className='basis-auto border-2 border-gray-300 rounded-xl p-1'> 
          <input onChange={(e)=>setEmail(e.target.value)} type='email' value={email} placeholder='Email' />
        </div>
      </div>
      <div className='flex flex-row'>
        <div className='basis-1/4 p-1'>
          <label/>Password:
        </div>
        <div className='basis-auto border-2 border-gray-300 rounded-xl p-1'>
          <input onChange={(e)=>setPassword(e.target.value)} type='password' value={password} placeholder='Password' />
        </div>
      </div>
      <div className='flex flex-row'>
        <div className='basis-1/4 p-1'>
          <label/>Age:
        </div>
        <div className='basis-auto border-2 border-gray-300 rounded-xl p-1'>
          <input onChange={(e)=>setAge(Number(e.target.value))} type='number' value={age} placeholder='Age' />
        </div>
      </div>
      <div className='text-center my-4  '>
        <button className='h-8 w-20 font-semibold bg-red-600 rounded-xl text-white'
        onClick={handleSignUp}
        >Submit</button>
      </div>
    </div>
  )
}

export default SignUp