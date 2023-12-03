import { GoogleLogin, useGoogleLogin, hasGrantedAllScopesGoogle, TokenResponse } from '@react-oauth/google'
import axios from 'axios'
import { useEffect, useState } from 'react'
import InputComponent from './InputComponent'
import { inputProps } from './type'
import Popup from './Popup'
interface user {
    email: string,
    password: string
}
const Login = () => {
    const [user, setUser] = useState<user>()
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [accessToken, setAccessToken] = useState<string>('')
    const [loginStatus, setLoginStatus] = useState<string>('')
    const [showModalLogin, setShowModalLogin] = useState(false)
    const [tokenResponse, setTokenResponse] = useState<TokenResponse>()
    const loginByGoogle: any = useGoogleLogin({
        onSuccess: tokenResponse => {
            console.log(tokenResponse)
            setAccessToken(tokenResponse.access_token)
            setTokenResponse(tokenResponse)
            const sendAcessTokenToBackend = async()=>{
                const getResult = await axios.post('http://localhost:8080/api/googlelogin',tokenResponse.access_token)
                console.log(getResult)
            }
            sendAcessTokenToBackend()
            // const hasAccess = hasGrantedAllScopesGoogle(
            //     tokenResponse && tokenResponse,
            //     'google-scope-1',
            //     'google-scope-2',
            // );
            // console.log(hasAccess);
        },
        // flow: 'auth-code',
    });
    console.log(accessToken)
    const handleLoginGoogle = async ()=>{
        const login = loginByGoogle()
    }
    const inputProps: inputProps[] = [{
        name: 'Emai',
        placeholder: 'Địa chỉ email của bạn',
        type:'text',
        getInput: function (value: string) {
            setUserName(value)
        }
    },
    {
        name: 'Password',
        placeholder: 'Password của bạn',
        type:'password',
        getInput: function (value: string) {
            setPassword(value)
        }
    }
    ]
    const handleLogin = async () => {
        try {
            setUser({
                email: userName,
                password: password
            })
            const userLogin = {
                email: userName,
                password: password
            }
            const getUser = await axios.post('http://localhost:8080/auth/signin',userLogin)
            if(getUser.status===200){
                setShowModalLogin(true)
                localStorage.setItem('accessToken',getUser.data)
            }
            console.log(localStorage.getItem('accessToken'))
            setLoginStatus('Đăng nhập thành công')
        } catch (err) {
            setShowModalLogin(true)
            setLoginStatus('Nhập sai mật khẩu hoặc email')
        }
    }
    console.log(loginStatus)
    const show = (showModal:boolean)=>{
        setShowModalLogin(showModal)
    }
    return (
        <div className='container mx-auto'>
            <div className='grid grid-cols-2 gap-8'>
                <div className='col-auto w-5/6 mx-auto'>
                    <img src={'https://static.kfcvietnam.com.vn/images/web/signin/lg/signin.jpg?v=g90lN4'} />
                </div>
                <div className='col-auto my-8 mx-auto'>
                    <div className='text-3xl font-bold my-4'>
                        Đăng nhập
                    </div>
                    <div className='my-8'>
                        {inputProps && inputProps.map((ip: inputProps) => {
                            return (
                                <div>
                                    <InputComponent input={ip} />
                                </div>
                            )
                        })}
                        {/* <InputComponent input={inputProps[1]} /> */}
                        <div>
                        <button className=' bg-red-500 text-white text-lg font-bold rounded-lg my-4 w-40 h-12 ml-20 hover:opacity-80 hover:bg-red-700' onClick={handleLogin}>Login</button>
                        </div>
                        {/* <GoogleLogin onSuccess={credentialResponse => {
                            console.log(credentialResponse);
                        }}
                            onError={() => {
                                console.log('Login Failed');
                            }} /> */}
                            <div>
                            <button type="button"
                            onClick={handleLoginGoogle}
                            className="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
                                <svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                                Sign up with Google<div></div></button>
                            </div>
                    </div>
                </div>

            </div>
            {showModalLogin ? <Popup show={show} status={loginStatus} />:''}
        </div>
    )
}

export default Login