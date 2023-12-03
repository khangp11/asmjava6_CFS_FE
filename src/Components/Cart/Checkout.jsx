import React from 'react'
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react'
import axios from 'axios'
import numeral from 'numeral';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import moment from 'moment';

const Checkout = () => {
    const location = useLocation();
    const { orderDetail } = location.state || {};
    const [paymentMethod, setPaymentMethod] = useState('');
    const [distanceInKm, setDistanceInKm] = useState(3);
    const [shippingFee, setShippingFee] = useState(0);
    const [order, setOrder] = useState({});



    useEffect(() => {
        const calculatedShippingFee = 5000 * distanceInKm;
        setShippingFee(calculatedShippingFee);
    }, [distanceInKm]);

    const handlePaymentChange = (event) => {
        setPaymentMethod(event.target.value);
    };
    const calculateTotalAmount = () => {
        if (orderDetail) {
            const totalAmount = orderDetail.listFood.reduce(
                (total, food) => total + food.price * food.quantity,
                0
            ) + shippingFee;
            return totalAmount;
        }
        return '0 VND';
    };
    const totalAmount = calculateTotalAmount();
    const totalAmountLong = parseInt(totalAmount, 10);
    const totalQuantity = orderDetail?.listFood.reduce((total, food) => total + food.quantity, 0);


    const currentDateTime = new Date();
    console.log(currentDateTime.getHours(), currentDateTime.getMinutes(), currentDateTime.getSeconds())
    const reccentTime = currentDateTime.getHours().toString() + ' ' + currentDateTime.getMinutes().toString() + ' ' + currentDateTime.getSeconds().toString()
    const date = currentDateTime.toLocaleDateString();
    const time = currentDateTime.toLocaleTimeString();
    const formattedDateTime = moment(date + ' ' + time, 'DD/MM/YYYY HH:mm:ss').format('DD/MM/YYYY') + ' ' + reccentTime;
    console.log(formattedDateTime)
    const newData = {
        user: orderDetail.userId,
        address: order.address,
        price: totalAmount,
        status: "Pending",
        foodId: orderDetail.listFood.map((li) => ({
            id: li.foodId,
            food_name: li.food_name,
            quantity: li.quantity,
            description: li.description,
            price: li.price,
            star: li.star,
            image: li.image,
            discount: li.discount,
            category: li.category
        })),
        date: formattedDateTime,
        quantity: totalQuantity,
        payment: paymentMethod,
        note: order.note || "not note"
    }


    const createOrder = async () => {
        console.log(newData)
        try {
            const response = await axios.post('http://localhost:8080/api/create/order', newData);
            console.log('Order created:', response.data);
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    const newDataArray = Object.values(newData);
    const handleSubmit = async () => {
        if (Array.isArray(newDataArray) && newDataArray.every(item => item !== '' && item !== null && item !== undefined)) {
            const userId = orderDetail.userId;
            const amount = totalAmountLong;
            try {
                if (paymentMethod === 'vnPay') {
                    const response = await axios.post(`http://localhost:8080/api/payment/pay?userId=${userId}&amount=${amount}`);
                    console.log("API", response.data);
                    window.location.href = response.data;
                } else if (paymentMethod === 'momo') {
                    const response = await axios.post(`http://localhost:8080/api/payment/momopay?userId=${userId}&amount=${amount}`);
                    console.log("API", response.data);
                    window.location.href = response.data;
                } else if (paymentMethod === 'shipcode') {
                    // order for youuu
                }
                createOrder();
            } catch (error) {
                console.error("lol", error);
            }
        } else {
            toast.warning("Address cannot be empty!")
        }
    };

    return (
        <>
            <div class="container">
                <div class="row">
                    <div class="col-md-6 mb-5 mb-md-0">
                        <h2 class="h3 mb-3 text-black">Your information</h2>
                        <div class="p-3 p-lg-5 border bg-white">
                            <div class="form-group">
                                <label for="c_fname" class="text-black">Account ID<span
                                    class="text-danger">*</span></label>
                                <div>{orderDetail.userId}</div>
                                <input path="account" name="account" type="hidden"
                                    value="{userDetail.username}" />
                            </div>
                            <div class="form-group">
                                <label for="c_fname" class="text-black">Fullname <span
                                    class="text-danger">*</span></label>
                                <input disabled="disabled"
                                    name="fullname" value={orderDetail.userName}
                                    id="input-firstname" type="text" class="form-control" />
                            </div>
                            <div class="form-group">
                                <label for="c_address" class="text-black">Phone number<span
                                    class="text-danger">*</span></label>
                                <input disabled="disabled"
                                    name="email" value={orderDetail.phone} id="input-email"
                                    type="email" class="form-control" />
                            </div>
                            <div class="form-group">
                                <label for="c_address" class="text-black">Address<span
                                    class="text-danger">*</span></label>
                                <input path="address" name="address"
                                    id="input-address-1" required
                                    type="text" class="form-control" value={order.address} onChange={(e) => setOrder({ ...order, address: e.target.value })} />
                            </div>
                            <div class="form-group">
                                <label for="input-company">Note<span class="required-f">*</span></label>
                                <textarea class="form-control resize-both" rows="3" value={order.note} onChange={(e) => setOrder({ ...order, note: e.target.value })}></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row mb-5">
                            <div class="col-md-12">
                                <h2 class="h3 mb-3 text-black">Your order</h2>
                                <div class="p-3 p-lg-5 border bg-white">
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col">Food Name</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Quantity</th>
                                                <th scope="col">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orderDetail?.listFood.map((food) => (
                                                <tr key={food.foodId}>
                                                    <td>
                                                        <strong class="mx-2">{food.food_name}</strong>
                                                    </td>
                                                    <td>
                                                        <span>{(food.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                                    </td>
                                                    <td>
                                                        <span>{food.quantity}</span>
                                                    </td>
                                                    <td>
                                                        <span>{(food.price * food.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tbody>
                                            <tr>
                                                <td className="text-black font-weight-bold">
                                                    <strong>Ship</strong>
                                                </td>
                                                <td colSpan="3" className="text-center">
                                                    <span>  {(shippingFee).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>

                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-black font-weight-bold">
                                                    <strong>Total All</strong>
                                                </td>
                                                <td colSpan="3" className="text-center font-weight-bold">
                                                    <strong>
                                                        {(totalAmount).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                    </strong>

                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="vnPayRadio"
                                name="paymentMethod"
                                value="vnPay"
                                checked={paymentMethod === 'vnPay'}
                                onChange={handlePaymentChange}
                            />
                            <label htmlFor="vnPayRadio">
                                <a type="button">
                                    Pay with VNPAY{' '}
                                    <img
                                        src="https://on.net.vn/web/image/3876184-2b57e083/202166185_2021396718013233_8499389898242103910_n.png"
                                        alt="VNPAY Logo"
                                        style={{ width: '40px', height: '40px' }}
                                        className="img-fluid product-thumbnail"
                                    />
                                </a>
                            </label>
                            <br />

                            <input
                                type="radio"
                                id="momoPayRadio"
                                name="paymentMethod"
                                value="momo"
                                checked={paymentMethod === 'momo'}
                                onChange={handlePaymentChange}
                            />
                            <label htmlFor="momoPayRadio">
                                <a type="button" >
                                    Pay with MOMO{' '}
                                    <img
                                        src="https://on.net.vn/web/image/3876184-2b57e083/202166185_2021396718013233_8499389898242103910_n.png"
                                        alt="Momo Logo"
                                        style={{ width: '40px', height: '40px' }}
                                        className="img-fluid product-thumbnail"
                                    />
                                </a>
                            </label>
                            <br />
                            <input
                                type="radio"
                                id="shipcodeRadio"
                                name="paymentMethod"
                                value="shipCode"
                                checked={paymentMethod === 'shipCode'}
                                onChange={handlePaymentChange}
                            />
                            <label htmlFor="shipcodeRadio">Pay directly upon receipt</label>
                            <br />
                        </div>
                        <div>
                            <button
                                className="btn btn-dark btn-lg py-3 btn-block"
                                type="button"
                                style={{ width: '200px', height: '60px' }}
                                onClick={handleSubmit}
                                disabled={!paymentMethod}
                            >
                                Order
                            </button>

                            <button
                                className="btn btn-dark btn-lg py-3 btn-block"
                                type="button"
                                style={{ width: '200px', height: '60px' }}
                            >
                                <Link to='/cart' className='align-middle text-white' >Back cart</Link>

                            </button>
                        </div>
                    </div>
                </div>
            </div >
            <div style={{ width: '100%', height: '500px' }}>

            </div>
        </>
    )
}

export default Checkout