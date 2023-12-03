import { Link } from 'react-router-dom'
import logo from '../images/logo.jpg'
interface item {
    name: string,
    image: string,
    atk: number,
    hp: number,
    crit: number,
    critdame: number
}
interface headerBar {
    name: string,
    link: string
}
const Header = () => {
    const headerBarLeft:headerBar[] =[{
        name: 'Thực đơn',
        link: '/'
    },
    {
        name: 'Khuyến mãi',
        link: '/login'
    },
    {
        name: 'Dịch vụ tiệc',
        link: ''
    },
    {
        name: 'Các cửa hàng',
        link: ''
    },]
    const headerBarRight: headerBar[] = [{
        name: 'Option',
        link: ''
    },
    {
        name: 'Cart',
        link: '/cart'
    },
    {
        name: 'Login',
        link: '/login'
    },
    {
        name: 'English',
        link: ''
    },]

    return (
        <div className='container mx-auto mb-8'>
            <div className='h-24 grid grid-cols-12 gap-4'>
                <div className='col-span-8 my-auto grid grid-cols-5 mx-auto'>
                    <div className='col-auto'>
                        <img className='w-20 mx-auto rounded-full' src={logo} />
                    </div>

                    {headerBarLeft && headerBarLeft.map((hb) => {
                        return (
                            <Link className='col-auto my-auto mx-auto font-bold text-lg px-2' to={`${hb.link}`}>
                            <div  >
                                {hb.name}
                            </div>
                            </Link>
                        )
                    })}

                </div>
                <div className='col-span-4 my-auto flex flex-row-reverse font-bold text-lg'>
                    {headerBarRight && headerBarRight.map((hr) => {
                        return (
                            <Link to={`${hr.link}`}>
                                <div className='mx-2'>
                                    {hr.name}
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
            <div className='w-full h-1 bg-gray-300 '></div>
        </div >
    )
}

export default Header