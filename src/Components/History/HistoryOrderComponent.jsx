import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom'
import { Button, Col, Container, Row } from 'react-bootstrap'
import Select from 'react-select';



const HistoryOrderComponent = () => {
    const [ListOrderUser, setListOrderUser] = useState([])
    const id = 1

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`http://localhost:8080/api/byUser/${id}`);
                setListOrderUser(response.data || []);
            } catch (error) {
                setListOrderUser([]);
            }
        }
        fetchData();
    }, []);
    return (
        <>
            <div class="card-body">
                {ListOrderUser.length === 0 ? (
                    <div>
                        <p style={{ textAlign: 'center', marginTop: '50px' }}>
                            You haven't placed any orders yet.

                        </p>

                    </div>
                ) : (
                    <div id="example2_wrapper" class="dataTables_wrapper dt-bootstrap4">
                        <div class="card-body">
                            <div id="example2_wrapper" class="dataTables_wrapper dt-bootstrap4"><div class="row"><div class="col-sm-12 col-md-6"></div><div class="col-sm-12 col-md-6"></div></div><div class="row"><div class="col-sm-12"><table id="example2" class="table table-bordered table-hover dataTable dtr-inline collapsed" aria-describedby="example2_info">
                                <thead>
                                    <tr>
                                        <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1" aria-label="Browser: activate to sort column ascending">STT</th>
                                        <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1" aria-label="Rendering engine: activate to sort column ascending">ID</th>
                                        <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1" aria-label="CSS grade: activate to sort column ascending">Username</th>
                                        <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1" aria-label="Platform(s): activate to sort column ascending">Address</th>
                                        <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1" aria-label="CSS grade: activate to sort column ascending">Price</th>
                                        <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1" aria-label="CSS grade: activate to sort column ascending">Status</th>
                                        <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1" aria-label="CSS grade: activate to sort column ascending">Date</th>
                                        <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1" aria-label="CSS grade: activate to sort column ascending">Payment</th>
                                        <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1" aria-label="CSS grade: activate to sort column ascending">Note</th>
                                        <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1" aria-label="CSS grade: activate to sort column ascending">Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ListOrderUser.map((orderUser, index) => {
                                        return (
                                            <tr key={orderUser.id}>
                                                <th>{index + 1}</th>
                                                <th>{orderUser.id}</th>
                                                <th>{orderUser.user.username}</th>
                                                <th>{orderUser.address}</th>
                                                <th>{orderUser.price}</th>
                                                <th>{orderUser.status}</th>
                                                <th>{orderUser.date}</th>
                                                <th>{orderUser.payment}</th>
                                                <th>{orderUser.note}</th>
                                                <th>{orderUser.quantity}</th>

                                            </tr>
                                        )
                                    })
                                    }
                                </tbody>
                            </table>
                            </div>
                            </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default HistoryOrderComponent